import { InputType, PartialType } from '@nestjs/graphql'
import { CartItemCreateInput } from './cart-item-create-input.dto'

@InputType()
export class CartItemUpdateInput extends PartialType(CartItemCreateInput) {}
