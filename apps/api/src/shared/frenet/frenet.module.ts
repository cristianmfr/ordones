import { Module } from '@nestjs/common'
import { FrenetService } from './frenet.service'

@Module({
  providers: [FrenetService],
  exports: [FrenetService],
})
export class FrenetModule {}
