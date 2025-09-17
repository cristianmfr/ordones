import { gql, type TypedDocumentNode } from '@apollo/client'
import type { UserRegisterOutput } from '@ordones/codegen/generated'

export const SIGN_IN: TypedDocumentNode<{
  signIn: string
}> = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`

export const SIGN_UP: TypedDocumentNode<{
  signUp: UserRegisterOutput
}> = gql`
  mutation SignUp($user: UserRegisterInput!) {
    signUp(user: $user) {
      accessToken
    }
}
`

export const REGISTER_USER_EMAIL: TypedDocumentNode<{
  signIn: string
}> = gql`
mutation CreateEmailTokenAndSend($email: String!) {
  createEmailTokenAndSend(email: $email)
}
`
