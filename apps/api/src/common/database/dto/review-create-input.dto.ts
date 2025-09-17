import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ReviewCreateInput {
  @Field(() => String)
  userId: string

  @Field(() => String)
  productId: string

  @Field(() => Int)
  rating: number

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  comment?: string

  @Field(() => Boolean, { nullable: true })
  isVerifiedPurchase?: boolean
}
