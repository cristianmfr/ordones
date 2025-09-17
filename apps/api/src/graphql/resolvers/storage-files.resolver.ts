import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { StorageFileCreateInput } from '@/common/database/dto/storage-file-create-input.dto'
import { StorageFileUpdateInput } from '@/common/database/dto/storage-file-update-input.dto'
import { StorageFile } from '@/common/database/entities/storage-file.entity'
import { StorageFileWithPresignedUrl } from '@/common/database/entities/storage-file-with-presigned-url.entity'
import { AuthGuard } from '@/common/guards/auth.guard'
import { StorageFilesService } from '../services/storage-files.service'

@Resolver(() => StorageFile)
export class StorageFilesResolver {
  constructor(private readonly storageFilesService: StorageFilesService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => StorageFileWithPresignedUrl, { name: 'storageFileCreate' })
  async createStorageFile(@Args('data') data: StorageFileCreateInput) {
    return this.storageFilesService.createStorageFile(data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => StorageFile, { name: 'storageFileUpdate' })
  async updateStorageFile(
    @Args('id') id: string,
    @Args('data') data: StorageFileUpdateInput
  ) {
    return this.storageFilesService.updateStorageFile(id, data)
  }

  @UseGuards(AuthGuard)
  @Query(() => StorageFileWithPresignedUrl, { name: 'storageFileUploadUrl' })
  async getStorageFileUploadUrl(@Args('fileKey') fileKey: string) {
    return this.storageFilesService.getStorageFileUploadUrl(fileKey)
  }
}
