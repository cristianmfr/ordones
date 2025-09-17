import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CartCreateInput {
  @Field(() => String)
  userId: string
}
