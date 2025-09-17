import { InputType, PartialType } from '@nestjs/graphql'
import { AddressCreateInput } from './address-create-input.dto'

@InputType()
export class AddressUpdateInput extends PartialType(AddressCreateInput) {}
