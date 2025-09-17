import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { StockMovementType } from '@ordones/database/generated'

registerEnumType(StockMovementType, { name: 'StockMovementType' })

@ObjectType()
export class StockMovement {
  @Field(() => String)
  id: string

  @Field(() => String)
  productId: string

  @Field(() => StockMovementType)
  type: StockMovementType

  @Field(() => Int)
  quantity: number

  @Field(() => String, { nullable: true })
  reason?: string | null

  @Field(() => String, { nullable: true })
  reference?: string | null

  @Field(() => Int)
  previousStock: number

  @Field(() => Int)
  newStock: number

  @Field(() => String, { nullable: true })
  createdBy?: string | null

  @Field(() => Date)
  createdAt: Date
}
