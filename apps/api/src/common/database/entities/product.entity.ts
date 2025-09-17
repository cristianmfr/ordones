import {
  Field,
  Float,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { ProductStatus } from '@ordones/database/generated'
import { BaseEntity } from './base.entity'
import { Category } from './category.entity'
import { ProductImage } from './product-image.entity'
import { Tag } from './tag.entity'

registerEnumType(ProductStatus, { name: 'ProductStatus' })

@ObjectType()
export class Product extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  slug: string

  @Field(() => Boolean)
  hasCustomOption: boolean

  @Field(() => Boolean)
  hasCustomModel: boolean

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => Float)
  price: number

  @Field(() => Int)
  discount: number

  @Field(() => Int)
  installments: number

  @Field(() => String)
  sku: string

  @Field(() => Int)
  stock: number

  @Field(() => ProductStatus)
  status: ProductStatus

  @Field(() => [Category], { nullable: true })
  categories?: Category[]

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[]

  @Field(() => Float)
  height: number

  @Field(() => Float)
  length: number

  @Field(() => Float)
  width: number

  @Field(() => Float)
  weight: number

  @Field(() => [ProductImage], { nullable: true })
  images?: ProductImage[] | null
}
