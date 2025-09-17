import { gql, type TypedDocumentNode } from '@apollo/client'

export const VALIDATE_TOKEN: TypedDocumentNode<{
  validateUserEmailToken: string
}> = gql`
   query ValidateUserEmailToken($token: String!) {
      validateUserEmailToken(token: $token)
   }
`
