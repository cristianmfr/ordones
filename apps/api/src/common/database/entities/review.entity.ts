import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class Review extends BaseEntity {
  @Field(() => String)
  userId: string

  @Field(() => String)
  productId: string

  @Field(() => Int)
  rating: number

  @Field(() => String, { nullable: true })
  title?: string | null

  @Field(() => String, { nullable: true })
  comment?: string | null

  @Field(() => Boolean)
  isVerifiedPurchase: boolean
}
