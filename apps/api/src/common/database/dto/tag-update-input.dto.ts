import { InputType, PartialType } from '@nestjs/graphql'
import { TagCreateInput } from './tag-create-input.dto'

@InputType()
export class TagUpdateInput extends PartialType(TagCreateInput) {}
