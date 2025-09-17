import { InputType, PartialType } from '@nestjs/graphql'
import { CategoryCreateInput } from './category-create-input.dto'

@InputType()
export class CategoryUpdateInput extends PartialType(CategoryCreateInput) {}
