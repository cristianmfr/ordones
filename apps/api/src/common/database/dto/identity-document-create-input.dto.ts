import { Field, ID, InputType } from '@nestjs/graphql'
import { DocumentType } from '@ordones/database/generated'

@InputType()
export class IdentityDocumentCreateInput {
  @Field(() => ID)
  userId: string

  @Field(() => String)
  documentNumber: string

  @Field(() => DocumentType)
  documentType: DocumentType
}
