import { Field, Float, InputType } from '@nestjs/graphql'
import { OrderStatus } from '@ordones/database/generated'

@InputType()
export class OrderCreateInput {
  @Field(() => String)
  orderNumber: string

  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus

  @Field(() => Float)
  total: number

  @Field(() => String)
  userId: string

  @Field(() => String, { nullable: true })
  shippingAddressId?: string

  @Field(() => String, { nullable: true })
  shippingMethodId?: string
}
