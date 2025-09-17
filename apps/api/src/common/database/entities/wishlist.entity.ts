import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Wishlist {
  @Field(() => String)
  id: string

  @Field(() => String)
  userId: string

  @Field(() => String)
  productId: string

  @Field(() => Date)
  createdAt: Date
}
