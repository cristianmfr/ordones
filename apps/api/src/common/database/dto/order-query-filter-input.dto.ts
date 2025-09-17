import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { Field, InputType } from '@nestjs/graphql'
import { OrderStatus } from '@ordones/database/generated'

@InputType()
export class OrderQueryFilterInput extends QueryPaginationInput {
  @Field(() => [OrderStatus], { nullable: true })
  status?: OrderStatus[]

  @Field(() => String, { nullable: true })
  userId?: string

  @Field(() => String, { nullable: true })
  orderNumber?: string
}
