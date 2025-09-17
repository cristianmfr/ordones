import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class Tag extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => Boolean)
  isActive: boolean
}
