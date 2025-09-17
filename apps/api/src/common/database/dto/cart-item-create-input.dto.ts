import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CartItemCreateInput {
  @Field(() => String)
  cartId: string

  @Field(() => String)
  productId: string

  @Field(() => Int)
  quantity: number
}
