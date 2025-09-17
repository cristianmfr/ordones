import { Module } from '@nestjs/common'
import { PrismaModule } from '@/shared/prisma/prisma.module'
import { CategoriesResolver } from '../resolvers/categories.resolver'
import { CategoriesService } from '../services/categories.service'

@Module({
  imports: [PrismaModule],
  providers: [CategoriesService, CategoriesResolver],
  exports: [CategoriesService],
})
export class CategoriesModule {}
