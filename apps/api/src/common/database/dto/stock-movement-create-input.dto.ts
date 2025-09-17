import { Field, InputType, Int } from '@nestjs/graphql'
import { StockMovementType } from '@ordones/database/generated'

@InputType()
export class StockMovementCreateInput {
  @Field(() => String)
  productId: string

  @Field(() => StockMovementType)
  type: StockMovementType

  @Field(() => Int)
  quantity: number

  @Field(() => String, { nullable: true })
  reason?: string

  @Field(() => String, { nullable: true })
  reference?: string

  @Field(() => Int)
  previousStock: number

  @Field(() => Int)
  newStock: number

  @Field(() => String, { nullable: true })
  createdBy?: string
}
