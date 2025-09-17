import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class OperationResult {
  @Field(() => Boolean)
  success: boolean

  @Field(() => String)
  message: string
}
