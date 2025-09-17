import { InputType, PartialType } from '@nestjs/graphql'
import { ReviewCreateInput } from './review-create-input.dto'

@InputType()
export class ReviewUpdateInput extends PartialType(ReviewCreateInput) {}
