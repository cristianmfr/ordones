import { Module } from '@nestjs/common'
import { PrismaModule } from '@/shared/prisma/prisma.module'
import { ReviewsResolver } from '../resolvers/reviews.resolver'
import { ReviewsService } from '../services/reviews.service'

@Module({
  imports: [PrismaModule],
  providers: [ReviewsService, ReviewsResolver],
  exports: [ReviewsService],
})
export class ReviewsModule {}
