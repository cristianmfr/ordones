import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class Category extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean

  @Field(() => Boolean, { defaultValue: false })
  isHighlight: boolean
}
