import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductStatus } from '@ordones/database/generated'
import { ProductCreateInput } from '@/common/database/dto/product-create-input.dto'
import { ProductCreateWithImagesInput } from '@/common/database/dto/product-create-with-images-input.dto'
import { ProductUpdateInput } from '@/common/database/dto/product-update-input.dto'
import { ProductsQueryFiltersInput } from '@/common/database/dto/products-query-filters-input.dto'
import { Product } from '@/common/database/entities/product.entity'
import { ProductPagination } from '@/common/database/entities/product-pagination.entity'
import { StorageFileWithPresignedUrl } from '@/common/database/entities/storage-file-with-presigned-url.entity'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { BrazilApiService } from '@/shared/brazil-api/brazil-api.service'
import { FrenetService } from '@/shared/frenet/frenet.service'
import { FrenetShippingRequestDto } from '@/shared/frenet/frenet-shipping-request.dto'
import { FrenetShippingResponseDto } from '@/shared/frenet/frenet-shipping-response.dto'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { S3Service } from '@/shared/s3/s3.service'

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
    private readonly frenetService: FrenetService,
    private readonly braService: BrazilApiService
  ) {}

  async createProduct(data: ProductCreateInput): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        hasCustomOption: data.hasCustomOption,
        hasCustomModel: data.hasCustomModel,
        description: data.description,
        price: data.price,
        sku: data.sku,
        stock: data.stock || 0,
        status: data.status,
        height: data.height || 0,
        length: data.length || 0,
        width: data.width || 0,
        weight: data.weight || 0,
        ...(data.categories &&
          data.categories.length > 0 && {
            categories: {
              create: data.categories.map(categoryId => ({
                category: {
                  connect: {
                    id: categoryId,
                  },
                },
              })),
            },
          }),
        ...(data.tags &&
          data.tags.length > 0 && {
            tags: {
              create: data.tags.map(tagId => ({
                tag: {
                  connect: {
                    id: tagId,
                  },
                },
              })),
            },
          }),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return {
      ...product,
      price: product.price,
      height: product.height,
      length: product.length,
      width: product.width,
      weight: product.weight,
      categories: product.categories.map(pc => pc.category),
      tags: product.tags.map(pt => pt.tag),
    } as Product
  }

  async createProductWithImages(data: ProductCreateWithImagesInput): Promise<{
    product: Product
    storageFilesWithPresignedUrls: StorageFileWithPresignedUrl[]
  }> {
    const storageFilesData = data.productImagesInputs

    const productCreateTransaction = await this.prisma.$transaction(
      async tx => {
        const categoriesIds = data.categories?.map(categoryId => ({
          id: categoryId,
        }))

        const tagsIds = data.tags?.map(tagId => ({
          id: tagId,
        }))

        const newProduct = {
          name: data.name,
          description: data.description,
          price: data.price,
          sku: data.sku,
          stock: data.stock || 0,
          status: data.status,
        }

        const product = await tx.product.create({
          data: {
            ...newProduct,
            slug: data.slug,
            hasCustomOption: data.hasCustomOption,
            hasCustomModel: data.hasCustomModel,
            height: 0,
            length: 0,
            width: 0,
            weight: 0,
            ...(categoriesIds &&
              categoriesIds.length > 0 && {
                categories: {
                  create: categoriesIds.map(categoryId => ({
                    category: {
                      connect: categoryId,
                    },
                  })),
                },
              }),
            ...(tagsIds &&
              tagsIds.length > 0 && {
                tags: {
                  create: tagsIds.map(tagId => ({
                    tag: {
                      connect: tagId,
                    },
                  })),
                },
              }),
          },
          include: {
            categories: {
              include: {
                category: true,
              },
            },
            tags: {
              include: {
                tag: true,
              },
            },
          },
        })

        const storageFilesList = storageFilesData.map(file => ({
          fileKey: `${file.fileKey}-${product.name.toLowerCase().trim()}-${file.fileName}`,
          fileName: file.fileName,
          fileBucket: file.fileBucket,
        }))

        await tx.storageFile.createMany({
          data: storageFilesList,
          skipDuplicates: true,
        })

        const createdStorageFiles = await tx.storageFile.findMany({
          where: {
            fileKey: {
              in: storageFilesList.map(file => file.fileKey),
            },
          },
        })

        const presignedUrls = await Promise.all(
          createdStorageFiles.map(async file => {
            const presignedUrl = await this.s3.getUploadPresignedUrl(
              file.fileKey
            )
            return {
              storageFile: file,
              presignedUrl,
            }
          })
        )

        return {
          product: {
            ...product,
            price: product.price,
            height: product.height,
            length: product.length,
            width: product.width,
            weight: product.weight,
            categories: product.categories.map(pc => pc.category),
            tags: product.tags.map(pt => pt.tag),
          } as Product,
          storageFilesWithPresignedUrls: presignedUrls,
        }
      }
    )

    return productCreateTransaction
  }

  async createProductImage(
    storageFileId: string,
    productId: string
  ): Promise<OperationResult> {
    const productImage = await this.prisma.productImage.create({
      data: {
        file: {
          connect: {
            id: storageFileId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    })

    if (!productImage) {
      throw new Error('Error when creating file association!')
    }

    return {
      success: true,
      message: 'Image relation created!',
    }
  }

  async updateProduct(id: string, data: ProductUpdateInput): Promise<Product> {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.price && { price: data.price }),
        ...(data.sku && { sku: data.sku }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.status && { status: data.status }),
        ...(data.categories !== undefined && {
          categories: {
            deleteMany: {},
            ...(data.categories.length > 0 && {
              create: data.categories.map(categoryId => ({
                category: {
                  connect: {
                    id: categoryId,
                  },
                },
              })),
            }),
          },
        }),
        ...(data.tags !== undefined && {
          tags: {
            deleteMany: {},
            ...(data.tags.length > 0 && {
              create: data.tags.map(tagId => ({
                tag: {
                  connect: {
                    id: tagId,
                  },
                },
              })),
            }),
          },
        }),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return {
      ...product,
      price: product.price,
      height: product.height,
      length: product.length,
      width: product.width,
      weight: product.weight,
      categories: product.categories.map(pc => pc.category),
      tags: product.tags.map(pt => pt.tag),
    } as Product
  }

  async deleteProduct(id: string): Promise<OperationResult> {
    const product = await this.prisma.product.delete({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException('Product not found!')
    }

    return {
      message: 'Product deleted successfully',
      success: true,
    }
  }

  async getProductsWithPagination(
    query?: QueryPaginationInput
  ): Promise<ProductPagination> {
    const where: any = {}

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          productImages: {
            include: {
              file: true,
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ])

    const itemsWithSignedUrls = await Promise.all(
      items.map(async item => {
        const imagesWithPresignedUrls = await Promise.all(
          item.productImages.map(async productImage => {
            const presignedUrl = await this.s3.getDownloadPresignedUrl(
              productImage.file.fileKey
            )

            return {
              ...productImage,
              presignedUrl,
            }
          })
        )

        return {
          ...item,
          price: item.price,
          height: item.height,
          length: item.length,
          width: item.width,
          weight: item.weight,
          images: imagesWithPresignedUrls,
        } as Product
      })
    )

    return {
      items: itemsWithSignedUrls,
      total,
    }
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        productImages: {
          include: {
            file: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!product) {
      throw new NotFoundException('Product not found!')
    }

    const imagesWithPresignedUrls = await Promise.all(
      product.productImages.map(async productImage => {
        const presignedUrl = await this.s3.getDownloadPresignedUrl(
          productImage.file.fileKey
        )

        return {
          ...productImage,
          presignedUrl,
        }
      })
    )

    return {
      ...product,
      categories: product.categories.map(pc => pc.category),
      tags: product.tags.map(pt => pt.tag),
      price: product.price,
      height: product.height,
      length: product.length,
      width: product.width,
      weight: product.weight,
      images: imagesWithPresignedUrls,
    } as Product
  }

  async getProductImages(id: string): Promise<StorageFileWithPresignedUrl[]> {
    const productWithImages = await this.prisma.product.findUnique({
      where: { id },
      include: {
        productImages: {
          include: {
            file: true,
          },
        },
      },
    })

    if (!productWithImages) {
      throw new NotFoundException('Product not found!')
    }

    const imagesWithPresignedUrls = await Promise.all(
      productWithImages.productImages.map(async productImage => {
        const presignedUrl = await this.s3.getDownloadPresignedUrl(
          productImage.file.fileKey
        )

        return {
          presignedUrl,
          storageFile: productImage.file,
        }
      })
    )

    return imagesWithPresignedUrls
  }

  async deleteProductImage(storageFileId: string): Promise<OperationResult> {
    const productImage = await this.prisma.productImage.findUnique({
      where: { fileId: storageFileId },
      include: {
        file: true,
      },
    })

    if (!productImage) {
      throw new NotFoundException('Product image not found!')
    }

    const deleteImageAndFile = await this.prisma.$transaction(async tx => {
      await this.s3.deleteFile(productImage.file.fileKey)

      await tx.productImage.delete({
        where: { id: productImage.id },
      })

      await tx.storageFile.delete({
        where: {
          id: productImage.file.id,
        },
      })

      return true
    })

    if (!deleteImageAndFile) {
      throw new Error('Error when deleting image!')
    }

    return {
      success: true,
      message: 'Image deleted successfully!',
    }
  }

  async getProductShippingQuote(
    productId: string,
    sellerCEP: string,
    recipientCEP: string,
    quantity: number = 1,
    recipientCountry: string = 'BR'
  ): Promise<FrenetShippingResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new NotFoundException('Product not found!')
    }

    const recipientAddress = await this.braService.getAddressByCep(recipientCEP)

    if (!recipientAddress) {
      throw new Error('Invalid CEP!')
    }

    const shippingRequest: FrenetShippingRequestDto = {
      SellerCEP: sellerCEP,
      RecipientCEP: recipientCEP,
      ShipmentInvoiceValue: Number(product.price),
      ShippingServiceCode: null,
      RecipientCountry: recipientCountry,
      ShippingItemArray: [
        {
          Height: product.height,
          Length: product.length,
          Width: product.width,
          Weight: product.weight,
          Quantity: quantity,
          SKU: product.sku,
          Category: undefined,
        },
      ],
    }

    const shippingQuote =
      await this.frenetService.getShippingQuote(shippingRequest)

    console.log(recipientAddress)

    const result = {
      RecipientAddress: `${recipientAddress.city}, ${recipientAddress.state}`,
      ...shippingQuote,
    }

    return result
  }

  async getProductsShippingQuote(
    productIds: string[],
    sellerCEP: string,
    recipientCEP: string,
    quantity: number = 1,
    recipientCountry: string = 'BR'
  ): Promise<FrenetShippingResponseDto> {
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    if (!products) {
      throw new NotFoundException('Product not found!')
    }

    const shippingRequest: FrenetShippingRequestDto = {
      SellerCEP: sellerCEP,
      RecipientCEP: recipientCEP,
      ShipmentInvoiceValue: Number(
        products.reduce((acc, product) => acc + product.price, 0)
      ),
      ShippingServiceCode: null,
      RecipientCountry: recipientCountry,
      ShippingItemArray: products.map(product => ({
        Height: product.height,
        Length: product.length,
        Width: product.width,
        Weight: product.weight,
        Quantity: quantity,
        SKU: product.sku,
        Category: undefined,
      })),
    }

    return await this.frenetService.getShippingQuote(shippingRequest)
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  async createManyProducts(products: ProductCreateInput[]): Promise<Product[]> {
    const createdProducts = await this.prisma.$transaction(async tx => {
      const results: Product[] = []

      for (const productData of products) {
        const product = await tx.product.create({
          data: {
            name: productData.name,
            slug: productData.slug || this.generateSlug(productData.name),
            description: productData.description,
            price: productData.price,
            sku: productData.sku,
            stock: productData.stock || 0,
            status: productData.status || ProductStatus.ACTIVE,
            discount: productData.discount || 0,
            installments: productData.installments || 1,
            hasCustomOption: productData.hasCustomOption || false,
            hasCustomModel: productData.hasCustomModel || false,
            height: productData.height || 0,
            length: productData.length || 0,
            width: productData.width || 0,
            weight: productData.weight || 0,
            ...(productData.categories &&
              productData.categories.length > 0 && {
                categories: {
                  create: productData.categories.map(categoryId => ({
                    category: {
                      connect: {
                        id: categoryId,
                      },
                    },
                  })),
                },
              }),
            ...(productData.tags &&
              productData.tags.length > 0 && {
                tags: {
                  create: productData.tags.map(tagId => ({
                    tag: {
                      connect: {
                        id: tagId,
                      },
                    },
                  })),
                },
              }),
          },
          include: {
            categories: {
              include: {
                category: true,
              },
            },
            tags: {
              include: {
                tag: true,
              },
            },
          },
        })

        results.push({
          ...product,
          categories: product.categories.map(pc => pc.category),
          tags: product.tags.map(pt => pt.tag),
        } as Product)
      }

      return results
    })

    return createdProducts
  }

  async getProductsWithFilters(
    filters?: ProductsQueryFiltersInput
  ): Promise<ProductPagination> {
    const where: any = {}
    const orderBy: any = {}

    // Implementa ordenação baseada no filtro
    if (filters?.order) {
      switch (filters.order) {
        case 'asc':
          orderBy.name = 'asc'
          break
        case 'desc':
          orderBy.name = 'desc'
          break
        case 'min':
          orderBy.price = 'asc'
          break
        case 'max':
          orderBy.price = 'desc'
          break
        default:
          orderBy.createdAt = 'desc'
          break
      }
    } else {
      // Ordenação padrão por relevância (mais recentes primeiro)
      orderBy.createdAt = 'desc'
    }

    if (filters?.categories && filters.categories.length > 0) {
      where.categories = {
        some: {
          categoryId: {
            in: filters.categories,
          },
        },
      }
    }

    if (filters?.tags && filters.tags.length > 0) {
      where.tags = {
        some: {
          tagId: {
            in: filters.tags,
          },
        },
      }
    }

    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {}
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice
      }
    }

    const skip = filters?.skip ?? 0
    const take = filters?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          productImages: {
            include: {
              file: true,
            },
          },
          categories: {
            include: {
              category: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ])

    const itemsWithSignedUrls = await Promise.all(
      items.map(async item => {
        const imagesWithPresignedUrls = await Promise.all(
          item.productImages.map(async productImage => {
            const presignedUrl = await this.s3.getDownloadPresignedUrl(
              productImage.file.fileKey
            )

            return {
              ...productImage,
              presignedUrl,
            }
          })
        )

        return {
          ...item,
          price: item.price,
          height: item.height,
          length: item.length,
          width: item.width,
          weight: item.weight,
          categories: item.categories.map(pc => pc.category),
          tags: item.tags.map(pt => pt.tag),
          images: imagesWithPresignedUrls,
        } as Product
      })
    )

    return {
      items: itemsWithSignedUrls,
      total,
    }
  }
}
