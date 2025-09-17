import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class ShippingMethod extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => Float)
  price: number

  @Field(() => Int)
  estimatedDays: number

  @Field(() => Boolean)
  isActive: boolean
}
