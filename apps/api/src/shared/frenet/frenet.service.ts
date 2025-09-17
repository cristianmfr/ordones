import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { env } from '@/config/env.config'
import { FrenetShippingRequestDto } from './frenet-shipping-request.dto'
import { FrenetShippingResponseDto } from './frenet-shipping-response.dto'

@Injectable()
export class FrenetService {
  private readonly defaultToken = env.FRENET_TOKEN

  async getShippingQuote(
    payload: FrenetShippingRequestDto,
    token?: string
  ): Promise<FrenetShippingResponseDto> {
    const apiUrl =
      process.env.NODE_ENV === 'development'
        ? '/api/frenet/shipping/quote'
        : 'https://private-1e4e3fe-frenetapi.apiary-mock.com/shipping/quote'

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token || this.defaultToken,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new HttpException(
          `Frenet API error: ${response.status} ${response.statusText}`,
          HttpStatus.BAD_REQUEST
        )
      }

      const result = (await response.json()) as FrenetShippingResponseDto
      return result
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException(
        'Failed to get shipping quote from Frenet',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
