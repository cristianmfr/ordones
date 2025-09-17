import { Field, Float, InputType, Int } from '@nestjs/graphql'

@InputType()
export class OrderItemCreateInput {
  @Field(() => Int)
  quantity: number

  @Field(() => Float)
  unitPrice: number

  @Field(() => Float)
  totalPrice: number

  @Field(() => String)
  orderId: string

  @Field(() => String)
  productId: string
}
