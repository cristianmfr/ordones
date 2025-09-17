import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserQueryFilterInput extends QueryPaginationInput {
  @Field(() => [String], { nullable: true })
  role?: string[]
}
