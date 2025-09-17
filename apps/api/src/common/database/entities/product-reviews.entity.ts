import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RatingCount {
  @Field(() => Int)
  one: number

  @Field(() => Int)
  two: number

  @Field(() => Int)
  three: number

  @Field(() => Int)
  four: number

  @Field(() => Int)
  five: number
}

@ObjectType()
export class ProductReviews {
  @Field(() => Int)
  totalReviews: number

  @Field(() => Int)
  averageRating: number

  @Field(() => RatingCount)
  ratingCounts: RatingCount
}
