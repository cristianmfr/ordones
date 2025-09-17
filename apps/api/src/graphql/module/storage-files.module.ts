import { Module } from '@nestjs/common'
import { PrismaModule } from '@/shared/prisma/prisma.module'
import { S3Module } from '@/shared/s3/s3.module'
import { StorageFilesResolver } from '../resolvers/storage-files.resolver'
import { StorageFilesService } from '../services/storage-files.service'

@Module({
  imports: [PrismaModule, S3Module],
  providers: [StorageFilesService, StorageFilesResolver],
  exports: [StorageFilesService],
})
export class StorageFilesModule {}
