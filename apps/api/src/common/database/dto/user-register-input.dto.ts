import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserRegisterInput {
  @Field(() => String)
  name: string

  @Field(() => Date, { nullable: true })
  birthdate?: Date | null

  @Field(() => String)
  password: string

  @Field(() => String)
  token: string
}
