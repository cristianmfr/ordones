import { Field, ObjectType } from '@nestjs/graphql'
import { Product } from './product.entity'
import { StorageFileWithPresignedUrl } from './storage-file-with-presigned-url.entity'

@ObjectType()
export class ProductWithImagesResponse {
  @Field(() => Product)
  product: Product

  @Field(() => [StorageFileWithPresignedUrl])
  storageFilesWithPresignedUrls: StorageFileWithPresignedUrl[]
}
