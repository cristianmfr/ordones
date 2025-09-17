import { InputType, PartialType } from '@nestjs/graphql'
import { PaymentCreateInput } from './payment-create-input.dto'

@InputType()
export class PaymentUpdateInput extends PartialType(PaymentCreateInput) {}
