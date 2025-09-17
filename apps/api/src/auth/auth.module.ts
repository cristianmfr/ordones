import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { jwtSchema } from 'src/common/constants/jwt-schema.constant'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { ResendModule } from '@/shared/resend/resend.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  imports: [
    PrismaModule,
    ResendModule,
    JwtModule.register({
      global: true,
      secret: jwtSchema.secret,
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
