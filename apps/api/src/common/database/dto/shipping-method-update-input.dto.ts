import { InputType, PartialType } from '@nestjs/graphql'
import { ShippingMethodCreateInput } from './shipping-method-create-input.dto'

@InputType()
export class ShippingMethodUpdateInput extends PartialType(
  ShippingMethodCreateInput,
) {}
