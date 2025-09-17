import { InputType, PartialType } from '@nestjs/graphql'
import { OrderItemCreateInput } from './order-item-create-input.dto'

@InputType()
export class OrderItemUpdateInput extends PartialType(OrderItemCreateInput) {}
