import { InputType, PartialType } from '@nestjs/graphql'
import { ProductCreateInput } from './product-create-input.dto'

@InputType()
export class ProductUpdateInput extends PartialType(ProductCreateInput) {}
