import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Order, OrderCreateInput } from '@ordones/codegen/generated'

export const CREATE_ORDER: TypedDocumentNode<{
  orderCreate: Order
  orderCreateInput: OrderCreateInput
}> = gql`
  mutation OrderCreate($data: OrderCreateInput!) {
    orderCreate(data: $data) {
      id
      createdAt
      updatedAt
      orderNumber
      status
      total
      userId
      shippingAddressId
      shippingMethodId
      confirmedAt
      shippedAt
      deliveredAt
    }
  }
  `
