import { gql, type TypedDocumentNode } from '@apollo/client'
import type {
  FrenetShippingResponseDto,
  Product,
  ProductReviews,
  ReviewProductOutput,
  StorageFileWithPresignedUrl,
} from '@ordones/codegen/generated'

export const PRODUCTS: TypedDocumentNode<{
  products: { items: Product[]; total: number }
  query?: { skip?: number; take?: number }
}> = gql`
  query Products($query: QueryPaginationInput!) {
    products(query: $query) {
      total
      items {
        id
        name
        price
        sku
        status
        stock
        description
        images {
          presignedUrl
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const PRODUCTS_WITH_FILTERS: TypedDocumentNode<{
  productsWithFilters: { items: Product[]; total: number }
  filters?: {
    skip?: number
    take?: number
    minPrice?: number
    maxPrice?: number
    categories: string[]
    tags: string[]
    order: string
  }
}> = gql`
  query ProductsWithFilters($filters: ProductsQueryFiltersInput!) {
    productsWithFilters(filters: $filters) {
      total
      items {
        id
        name
        price
        status
        stock
        description
        discount
        installments
        categories {
          id
          name
          isActive
          isHighlight
        }
        tags {
          id
          name
          isActive
        }
      }
    }
  }
`

export const PRODUCT: TypedDocumentNode<{
  product: Product
}> = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      price
      sku
      status
      stock
      description
      height
      width
      length
      weight
      categories {
        id
        name
      }
      tags {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const PRODUCT_DETAILS: TypedDocumentNode<{
  reviewsProduct: ReviewProductOutput[]
  reviewsProductSummary: ProductReviews
  product: Product
  products: {
    items: Product[]
    total: number
  }
}> = gql`
query ProductDetails($productId: String!, $query: QueryPaginationInput!) {
  product(id: $productId) {
    id
    name
    price
    status
    stock
    description
    images {
      presignedUrl
    }
  }
  products(query: $query) {
    items {
      id
      name
      price
      images {
        presignedUrl
      }
    }
  }
  reviewsProductSummary(productId: $productId) {
    totalReviews
    averageRating
    ratingCounts {
      one
      two
      three
      four
      five
    }
  }
  reviewsProduct(productId: $productId) {
    title
    rating
    createdBy
    createdAt
    comment
  }
}
`

export const PRODUCT_SHIPPING_QUOTE: TypedDocumentNode<{
  productShippingQuote: FrenetShippingResponseDto
}> = gql`
query ProductShippingQuote($productId: String!, $sellerCep: String!, $recipientCep: String!) {
  productShippingQuote(productId: $productId, sellerCEP: $sellerCep, recipientCEP: $recipientCep) {
    RecipientAddress
    ShippingSevicesArray {
      ServiceDescription
      OriginalDeliveryTime
      OriginalShippingPrice
    }
  }
}
`

export const PRODUCT_IMAGES: TypedDocumentNode<{
  productImages: StorageFileWithPresignedUrl[]
}> = gql`
  query ProductImages($productId: String!) {
    productImages(id: $productId) {
      presignedUrl
      storageFile {
        id
        fileName
        fileKey
        fileBucket
        fileStatus
        createdAt
        updatedAt
      }
    }
  }
`
