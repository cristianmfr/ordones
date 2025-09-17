import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@ObjectType()
export class UserRegisterOutput {
  @Field(() => User)
  user: User

  @Field(() => String)
  accessToken: string
}
