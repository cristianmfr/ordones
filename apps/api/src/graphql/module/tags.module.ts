import { Module } from '@nestjs/common'
import { PrismaModule } from '@/shared/prisma/prisma.module'
import { TagsResolver } from '../resolvers/tags.resolver'
import { TagsService } from '../services/tags.service'

@Module({
  imports: [PrismaModule],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
