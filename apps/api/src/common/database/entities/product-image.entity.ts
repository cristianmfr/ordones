import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { Product } from './product.entity'
import { StorageFile } from './storage-file.entity'

@ObjectType()
export class ProductImage extends BaseEntity {
  @Field(() => Product, { nullable: true })
  product?: Product

  @Field(() => StorageFile)
  file: StorageFile

  @Field(() => String, { nullable: true })
  presignedUrl?: string
}
