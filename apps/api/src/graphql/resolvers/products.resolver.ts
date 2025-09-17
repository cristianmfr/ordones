import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductCreateInput } from '@/common/database/dto/product-create-input.dto'
import { ProductCreateWithImagesInput } from '@/common/database/dto/product-create-with-images-input.dto'
import { ProductUpdateInput } from '@/common/database/dto/product-update-input.dto'
import { ProductsQueryFiltersInput } from '@/common/database/dto/products-query-filters-input.dto'
import { Product } from '@/common/database/entities/product.entity'
import { ProductPagination } from '@/common/database/entities/product-pagination.entity'
import { ProductWithImagesResponse } from '@/common/database/entities/product-with-images-response.entity'
import { StorageFileWithPresignedUrl } from '@/common/database/entities/storage-file-with-presigned-url.entity'
import { AuthGuard } from '@/common/guards/auth.guard'
import { OperationResult } from '@/common/interfaces/operation-result.dto'
import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { FrenetShippingResponseDto } from '@/shared/frenet/frenet-shipping-response.dto'
import { ProductsService } from '../services/products.service'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Product, { name: 'productCreate' })
  async createProduct(@Args('data') data: ProductCreateInput) {
    return this.productsService.createProduct(data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => [Product], { name: 'productCreateMany' })
  async createManyProducts(
    @Args('products', { type: () => [ProductCreateInput] })
    products: ProductCreateInput[]
  ) {
    return this.productsService.createManyProducts(products)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProductWithImagesResponse, {
    name: 'productCreateWithImages',
  })
  async createProductWithImages(
    @Args('data') data: ProductCreateWithImagesInput
  ) {
    return this.productsService.createProductWithImages(data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OperationResult, {
    name: 'productCreateImage',
  })
  async createProductImage(
    @Args('fileId') fileId: string,
    @Args('productId') productId: string
  ) {
    return this.productsService.createProductImage(fileId, productId)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Product, { name: 'productUpdate' })
  async updateProduct(
    @Args('id') id: string,
    @Args('data') data: ProductUpdateInput
  ) {
    return this.productsService.updateProduct(id, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OperationResult, { name: 'productDelete' })
  async deleteProduct(@Args('id') id: string) {
    return this.productsService.deleteProduct(id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => OperationResult, { name: 'productImageDelete' })
  async deleteProductImage(@Args('id') id: string) {
    return this.productsService.deleteProductImage(id)
  }

  @Query(() => ProductPagination, { name: 'products' })
  async getProducts(@Args('query') query: QueryPaginationInput) {
    return this.productsService.getProductsWithPagination(query)
  }

  @Query(() => ProductPagination, { name: 'productsWithFilters' })
  async getProductsWithFilters(
    @Args('filters') filters: ProductsQueryFiltersInput
  ) {
    return this.productsService.getProductsWithFilters(filters)
  }

  @Query(() => Product, { name: 'product' })
  async getProductById(@Args('id') id: string) {
    return this.productsService.getProductById(id)
  }

  @Query(() => [StorageFileWithPresignedUrl], { name: 'productImages' })
  async getProductImages(@Args('id') id: string) {
    return this.productsService.getProductImages(id)
  }

  @Query(() => FrenetShippingResponseDto, { name: 'productShippingQuote' })
  async getProductShippingQuote(
    @Args('productId') productId: string,
    @Args('sellerCEP') sellerCEP: string,
    @Args('recipientCEP') recipientCEP: string,
    @Args('quantity', { defaultValue: 1 }) quantity: number,
    @Args('recipientCountry', { defaultValue: 'BR' }) recipientCountry: string
  ) {
    return this.productsService.getProductShippingQuote(
      productId,
      sellerCEP,
      recipientCEP,
      quantity,
      recipientCountry
    )
  }

  @Query(() => FrenetShippingResponseDto, { name: 'productsShippingQuote' })
  async getProductsShippingQuote(
    @Args('productIds', { type: () => [String] }) productIds: string[],
    @Args('sellerCEP') sellerCEP: string,
    @Args('recipientCEP') recipientCEP: string,
    @Args('quantity', { defaultValue: 1 }) quantity: number,
    @Args('recipientCountry', { defaultValue: 'BR' }) recipientCountry: string
  ) {
    return this.productsService.getProductsShippingQuote(
      productIds,
      sellerCEP,
      recipientCEP,
      quantity,
      recipientCountry
    )
  }
}
