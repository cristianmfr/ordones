import { Field, InputType } from '@nestjs/graphql'
import { FrenetShippingItemDto } from './frenet-shipping-item.dto'

@InputType()
export class FrenetShippingRequestDto {
  @Field(() => String)
  SellerCEP: string

  @Field(() => String)
  RecipientCEP: string

  @Field(() => Number)
  ShipmentInvoiceValue: number

  @Field(() => String, { nullable: true })
  ShippingServiceCode: string | null

  @Field(() => [FrenetShippingItemDto])
  ShippingItemArray: FrenetShippingItemDto[]

  @Field(() => String)
  RecipientCountry: string
}
