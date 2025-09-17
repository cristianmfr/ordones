import { Field, ObjectType } from '@nestjs/graphql'
import { StorageFile } from './storage-file.entity'

@ObjectType()
export class StorageFileWithPresignedUrl {
  @Field(() => String)
  presignedUrl: string

  @Field(() => StorageFile)
  storageFile: StorageFile
}
