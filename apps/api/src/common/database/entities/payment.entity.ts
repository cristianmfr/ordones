import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { PaymentMethod, PaymentStatus } from '@ordones/database/generated'
import GraphQLJSON from 'graphql-type-json'
import { BaseEntity } from './base.entity'

registerEnumType(PaymentStatus, { name: 'PaymentStatus' })
registerEnumType(PaymentMethod, { name: 'PaymentMethod' })

@ObjectType()
export class Payment extends BaseEntity {
  @Field(() => String)
  orderId: string

  @Field(() => Float)
  amount: number

  @Field(() => PaymentMethod)
  method: PaymentMethod

  @Field(() => PaymentStatus)
  status: PaymentStatus

  @Field(() => String, { nullable: true })
  transactionId?: string | null

  @Field(() => GraphQLJSON, { nullable: true })
  gatewayResponse?: any | null

  @Field(() => String, { nullable: true })
  failureReason?: string | null

  @Field(() => Date, { nullable: true })
  paidAt?: Date | null
}
