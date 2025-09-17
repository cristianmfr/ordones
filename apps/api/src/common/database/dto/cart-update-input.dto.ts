import { InputType, PartialType } from '@nestjs/graphql'
import { CartCreateInput } from './cart-create-input.dto'

@InputType()
export class CartUpdateInput extends PartialType(CartCreateInput) {}
