import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class BrazilApiCepResponse {
  @Field(() => String)
  cep: string

  @Field(() => String)
  state: string

  @Field(() => String)
  city: string

  @Field(() => String)
  neighborhood: string

  @Field(() => String)
  street: string

  @Field(() => String)
  service: string
}
