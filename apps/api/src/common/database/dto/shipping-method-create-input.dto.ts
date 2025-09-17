import { Field, Float, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ShippingMethodCreateInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float)
  price: number

  @Field(() => Int)
  estimatedDays: number

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean
}
