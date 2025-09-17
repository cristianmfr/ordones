import { Module } from '@nestjs/common'
import { Resend } from 'resend'
import { env } from '@/config/env.config'
import { ResendService } from './resend.service'

@Module({
  providers: [
    {
      provide: Resend,
      useFactory: () => new Resend(env.RESEND_API_KEY),
    },
    ResendService,
  ],
  exports: [ResendService],
})
export class ResendModule {}
