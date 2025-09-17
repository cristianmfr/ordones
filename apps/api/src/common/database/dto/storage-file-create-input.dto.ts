import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class StorageFileCreateInput {
  @Field(() => String)
  fileName: string

  @Field(() => String)
  fileKey: string

  @Field(() => String)
  fileBucket: string
}
