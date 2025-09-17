import { Module } from '@nestjs/common'
import { BrazilApiModule } from '@/shared/brazil-api/brazil-api.module'
import { FrenetModule } from '@/shared/frenet/frenet.module'
import { PrismaModule } from '@/shared/prisma/prisma.module'
import { S3Module } from '@/shared/s3/s3.module'
import { ProductsResolver } from '../resolvers/products.resolver'
import { ProductsService } from '../services/products.service'

@Module({
  imports: [PrismaModule, S3Module, FrenetModule, BrazilApiModule],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
