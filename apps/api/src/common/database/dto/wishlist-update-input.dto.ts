import { InputType, PartialType } from '@nestjs/graphql'
import { WishlistCreateInput } from './wishlist-create-input.dto'

@InputType()
export class WishlistUpdateInput extends PartialType(WishlistCreateInput) {}
