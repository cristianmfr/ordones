import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Category } from '@ordones/codegen/generated'

export const CATEGORIES: TypedDocumentNode<{
  categories: { items: Category[]; total: number }
  query?: { skip?: number; take?: number }
}> = gql`
  query Categories($query: QueryPaginationInput!) {
    categories(query: $query) {
      items {
        id
        name
        description
        isActive
        isHighlight
        createdAt
        updatedAt
      }
      total
    }
  }
`
export const CATEGORY: TypedDocumentNode<{
  category: Category
}> = gql`
  query Category($categoryId: String!) {
    category(id: $categoryId) {
      id
      name
      description
      isActive
      isHighlight
      createdAt
      updatedAt
    }
  }
`
