import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ReviewProductOutput {
  @Field(() => String)
  createdBy: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Int)
  rating: number

  @Field(() => String, { nullable: true })
  title?: string | null

  @Field(() => String, { nullable: true })
  comment?: string | null
}
