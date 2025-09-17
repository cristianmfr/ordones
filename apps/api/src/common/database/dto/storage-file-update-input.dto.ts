import { Field, InputType, PartialType } from '@nestjs/graphql'
import { FileStatus } from '@ordones/database/generated'
import { StorageFileCreateInput } from './storage-file-create-input.dto'

@InputType()
export class StorageFileUpdateInput extends PartialType(
  StorageFileCreateInput
) {
  @Field(() => FileStatus)
  fileStatus: FileStatus
}
