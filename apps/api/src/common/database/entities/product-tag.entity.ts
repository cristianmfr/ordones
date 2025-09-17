import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class ProductTag extends BaseEntity {
  @Field(() => String)
  productId: string

  @Field(() => String)
  tagId: string
}
