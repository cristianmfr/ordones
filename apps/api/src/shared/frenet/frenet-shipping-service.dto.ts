import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FrenetShippingServiceDto {
  @Field(() => String)
  Carrier: string

  @Field(() => String)
  CarrierCode: string

  @Field(() => String)
  DeliveryTime: string

  @Field(() => String)
  Msg: string

  @Field(() => String)
  ServiceCode: string

  @Field(() => String)
  ServiceDescription: string

  @Field(() => String)
  ShippingPrice: string

  @Field(() => String)
  OriginalDeliveryTime: string

  @Field(() => String)
  OriginalShippingPrice: string

  @Field(() => Boolean)
  Error: boolean
}
