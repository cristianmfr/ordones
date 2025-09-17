import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WishlistCreateInput {
  @Field(() => String)
  userId: string

  @Field(() => String)
  productId: string
}
