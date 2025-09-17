import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CategoryCreateInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Boolean, { defaultValue: true })
  isActive?: boolean

  @Field(() => Boolean, { defaultValue: false })
  isHighlight?: boolean
}
