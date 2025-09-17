import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { FileStatus } from '@ordones/database/generated'
import { BaseEntity } from '@/common/database/entities/base.entity'

registerEnumType(FileStatus, { name: 'FileStatus' })

@ObjectType()
export class StorageFile extends BaseEntity {
  @Field(() => FileStatus)
  fileStatus: FileStatus

  @Field(() => String)
  fileName: string

  @Field(() => String)
  fileKey: string

  @Field(() => String)
  fileBucket: string
}
