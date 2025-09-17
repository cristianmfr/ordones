import { InputType, PartialType } from '@nestjs/graphql'
import { OrderCreateInput } from './order-create-input.dto'

@InputType()
export class OrderUpdateInput extends PartialType(OrderCreateInput) {}
