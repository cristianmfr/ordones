import { Field, ObjectType } from '@nestjs/graphql'
import { FrenetShippingServiceDto } from './frenet-shipping-service.dto'

@ObjectType()
export class FrenetShippingResponseDto {
  @Field(() => String, { nullable: true })
  RecipientAddress?: string

  @Field(() => [FrenetShippingServiceDto])
  ShippingSevicesArray: FrenetShippingServiceDto[]

  @Field(() => Number)
  Timeout: number
}
