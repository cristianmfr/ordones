import { Module } from '@nestjs/common'
import { BrazilApiService } from './brazil-api.service'

@Module({
  providers: [BrazilApiService],
  exports: [BrazilApiService],
})
export class BrazilApiModule {}
