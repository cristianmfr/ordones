import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FrenetShippingItemDto {
  @Field(() => Number)
  Height: number

  @Field(() => Number)
  Length: number

  @Field(() => Number)
  Quantity: number

  @Field(() => Number)
  Weight: number

  @Field(() => Number)
  Width: number

  @Field(() => String, { nullable: true })
  SKU?: string

  @Field(() => String, { nullable: true })
  Category?: string
}
