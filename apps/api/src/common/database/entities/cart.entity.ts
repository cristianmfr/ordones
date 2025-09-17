import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class Cart extends BaseEntity {
  @Field(() => String)
  userId: string
}
