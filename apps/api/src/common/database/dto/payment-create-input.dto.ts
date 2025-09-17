import { Field, Float, InputType } from '@nestjs/graphql'
import { PaymentMethod, PaymentStatus } from '@ordones/database/generated'
import GraphQLJSON from 'graphql-type-json'

@InputType()
export class PaymentCreateInput {
  @Field(() => String)
  orderId: string

  @Field(() => Float)
  amount: number

  @Field(() => PaymentMethod)
  method: PaymentMethod

  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus

  @Field(() => String, { nullable: true })
  transactionId?: string

  @Field(() => GraphQLJSON, { nullable: true })
  gatewayResponse?: any

  @Field(() => String, { nullable: true })
  failureReason?: string
}
