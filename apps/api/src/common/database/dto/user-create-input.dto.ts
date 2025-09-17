import { Field, InputType } from '@nestjs/graphql'
import { DocumentType, UserRole } from '@ordones/database/generated'

@InputType()
export class UserCreateInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => Date, { nullable: true })
  birthdate?: Date | null

  @Field(() => String, { nullable: true })
  documentNumber?: string | null

  @Field(() => DocumentType)
  documentType: DocumentType

  @Field(() => String)
  password: string

  @Field(() => String, { nullable: true })
  phone?: string

  @Field(() => UserRole, { nullable: true })
  role?: UserRole
}
