import { gql, type TypedDocumentNode } from '@apollo/client'
import type { User } from '@ordones/codegen/generated'

export const USER_UPDATE: TypedDocumentNode<{
  userUpdate: User
}> = gql`
      mutation UserUpdate($userUpdateId: String!, $data: UserUpdateInput!) {
      userUpdate(id: $userUpdateId, data: $data) {
         id
      }
   }
`
