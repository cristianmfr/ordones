import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TagCreateInput {
  @Field(() => String)
  name: string

  @Field(() => Boolean)
  isActive?: boolean
}
