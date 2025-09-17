import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { ProductStatus } from '@ordones/database/generated'
import { StorageFileCreateInput } from './storage-file-create-input.dto'

@InputType()
export class ProductCreateWithImagesInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  slug: string

  @Field(() => Boolean)
  hasCustomOption: boolean

  @Field(() => Boolean)
  hasCustomModel: boolean

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

  @Field(() => [String], { nullable: true })
  categories?: string[]

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => [StorageFileCreateInput])
  productImagesInputs: StorageFileCreateInput[]
}
