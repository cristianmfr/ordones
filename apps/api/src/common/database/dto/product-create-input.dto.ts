import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { ProductStatus } from '@ordones/database/generated'

@InputType()
export class ProductCreateInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  slug: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float)
  price: number

  @Field(() => String)
  sku: string

  @Field(() => Int, { nullable: true })
  stock?: number

  @Field(() => ProductStatus, { nullable: true })
  status?: ProductStatus

  @Field(() => Int, { nullable: true })
  discount?: number

  @Field(() => Int, { nullable: true })
  installments?: number

  @Field(() => Boolean, { nullable: true })
  hasCustomOption?: boolean

  @Field(() => Boolean, { nullable: true })
  hasCustomModel?: boolean

  @Field(() => [String], { nullable: true })
  categories?: string[]

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => Float)
  height: number

  @Field(() => Float)
  length: number

  @Field(() => Float)
  width: number

  @Field(() => Float)
  weight: number
}
