import { QueryPaginationInput } from '@/common/interfaces/query-pagination-input.dto'
import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class ProductsQueryFiltersInput extends QueryPaginationInput {
  @Field(() => [String], { nullable: true })
  categories?: string[]

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => Float, { nullable: true })
  minPrice?: number

  @Field(() => Float, { nullable: true })
  maxPrice?: number

  @Field(() => String, { nullable: true })
  order?: string
}
