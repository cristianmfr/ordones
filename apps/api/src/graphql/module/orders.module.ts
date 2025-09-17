import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { OrdersResolver } from '../resolvers/orders.resolver'
import { OrdersService } from '../services/orders.service'

@Module({
  imports: [PrismaModule],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
