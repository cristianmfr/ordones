import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { OrderStatus } from '@ordones/database/generated'
import { BaseEntity } from './base.entity'

registerEnumType(OrderStatus, { name: 'OrderStatus' })

@ObjectType()
export class Order extends BaseEntity {
  @Field(() => String)
  orderNumber: string

  @Field(() => OrderStatus)
  status: OrderStatus

  @Field(() => Float)
  total: number

  @Field(() => String)
  userId: string

  @Field(() => String, { nullable: true })
  shippingAddressId?: string | null

  @Field(() => String, { nullable: true })
  shippingMethodId?: string | null

  @Field(() => Date, { nullable: true })
  confirmedAt?: Date | null

  @Field(() => Date, { nullable: true })
  shippedAt?: Date | null

  @Field(() => Date, { nullable: true })
  deliveredAt?: Date | null
}
