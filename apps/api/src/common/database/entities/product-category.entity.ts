import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class ProductCategory extends BaseEntity {
  @Field(() => String)
  productId: string

  @Field(() => String)
  categoryId: string
}
