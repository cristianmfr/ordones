import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { EmailTokenStatus } from '@ordones/database/generated'
import { BaseEntity } from './base.entity'

registerEnumType(EmailTokenStatus, { name: 'EmailTokenStatus' })

@ObjectType()
export class EmailToken extends BaseEntity {
  @Field(() => String)
  email: string

  @Field(() => String)
  token: string

  @Field(() => EmailTokenStatus, { defaultValue: EmailTokenStatus.PENDING })
  status: EmailTokenStatus
}
