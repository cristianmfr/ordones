import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class OrderItem extends BaseEntity {
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
