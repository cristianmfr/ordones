import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { DocumentType } from '@ordones/database/generated'
import { BaseEntity } from './base.entity'

registerEnumType(DocumentType, { name: 'DocumentType' })

@ObjectType()
export class IdentityDocument extends BaseEntity {
  @Field(() => String)
  documentNumber: string

  @Field(() => DocumentType)
  documentType: DocumentType
}
