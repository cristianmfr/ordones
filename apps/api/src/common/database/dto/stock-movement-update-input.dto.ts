import { InputType, PartialType } from '@nestjs/graphql'
import { StockMovementCreateInput } from './stock-movement-create-input.dto'

@InputType()
export class StockMovementUpdateInput extends PartialType(
  StockMovementCreateInput,
) {}
