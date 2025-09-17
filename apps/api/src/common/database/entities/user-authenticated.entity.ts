import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserRole } from '@ordones/database/generated'
import { BaseEntity } from './base.entity'

registerEnumType(UserRole, { name: 'UserRole' })

@ObjectType()
export class UserAuthenticated extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => Date, { nullable: true })
  birthdate?: Date | null

  @Field(() => String, { nullable: true })
  phone?: string | null

  @Field(() => UserRole)
  role: UserRole

  @Field(() => String, { nullable: true })
  resetToken?: string | null

  @Field(() => String, { nullable: true })
  document?: string | null

  @Field(() => String, { nullable: true })
  documentType?: string | null

  @Field(() => Boolean)
  isActive: boolean
}
