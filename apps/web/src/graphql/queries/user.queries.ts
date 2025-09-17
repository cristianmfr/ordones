import { gql, type TypedDocumentNode } from '@apollo/client'
import type { UserAuthenticated } from '@ordones/codegen/generated'

export const USER_AUTHENTICATED: TypedDocumentNode<{
  userAuthenticated: UserAuthenticated
}> = gql`
  query UserAuthenticated {
    userAuthenticated {
      id
      name
      email
      phone
      birthdate
      isActive
      createdAt
      updatedAt
      resetToken
      role
      documentType
      document
    }
  }
`
