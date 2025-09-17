import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { BrazilApiCepResponse } from './brazil-api-cep-response.dto'

@Injectable()
export class BrazilApiService {
  async getAddressByCep(recipientCep: string): Promise<BrazilApiCepResponse> {
    const apiUrl = `https://brasilapi.com.br/api/cep/v2/${recipientCep}`

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new HttpException(
          `Brazil API error: ${response.status} ${response.statusText}`,
          HttpStatus.BAD_REQUEST
        )
      }

      const result = (await response.json()) as BrazilApiCepResponse
      return result
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException(
        'Failed to get shipping quote from Brazil API',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
