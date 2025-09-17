import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class CartItem extends BaseEntity {
  @Field(() => String)
  cartId: string

  @Field(() => String)
  productId: string

  @Field(() => Int)
  quantity: number
}
