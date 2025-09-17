import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Tag } from '@ordones/codegen/generated'

export const TAGS: TypedDocumentNode<{
  tags: { items: Tag[]; total: number }
  query?: { skip?: number; take?: number }
}> = gql`
  query Tags($query: QueryPaginationInput!) {
    tags(query: $query) {
      items {
        id
        name
        isActive
        createdAt
        updatedAt
      }
      total
    }
  }
`

export const TAG: TypedDocumentNode<{
  tag: Tag
}> = gql`
  query Tag($tagId: String!) {
    tag(id: $tagId) {
      id
      name
      isActive
      createdAt
      updatedAt
    }
  }
`
