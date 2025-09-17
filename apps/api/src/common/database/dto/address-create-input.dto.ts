import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddressCreateInput {
  @Field(() => String)
  street: string

  @Field(() => String, { nullable: true })
  number?: string

  @Field(() => String, { nullable: true })
  complement?: string

  @Field(() => String)
  neighborhood: string

  @Field(() => String)
  city: string

  @Field(() => String)
  state: string

  @Field(() => String)
  zipCode: string

  @Field(() => String, { nullable: true })
  country?: string

  @Field(() => String)
  userId: string
}
