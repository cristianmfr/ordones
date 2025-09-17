import { Injectable, NotFoundException } from '@nestjs/common'
import { StorageFileCreateInput } from '@/common/database/dto/storage-file-create-input.dto'
import { StorageFileUpdateInput } from '@/common/database/dto/storage-file-update-input.dto'
import { StorageFile } from '@/common/database/entities/storage-file.entity'
import { StorageFileWithPresignedUrl } from '@/common/database/entities/storage-file-with-presigned-url.entity'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { S3Service } from '@/shared/s3/s3.service'

@Injectable()
export class StorageFilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service
  ) {}

  async createStorageFile(
    data: StorageFileCreateInput
  ): Promise<StorageFileWithPresignedUrl> {
    const storageFile = await this.prisma.storageFile.create({
      data: { ...data },
    })

    if (!storageFile) {
      throw new NotFoundException('Storage file register not found!')
    }

    const presignedUrl = await this.s3.getUploadPresignedUrl(
      storageFile.fileKey
    )

    return {
      presignedUrl,
      storageFile,
    }
  }

  async getStorageFileUploadUrl(
    fileKey: string
  ): Promise<StorageFileWithPresignedUrl> {
    const storageFile = await this.prisma.storageFile.findUnique({
      where: { fileKey },
    })

    if (!storageFile) {
      throw new NotFoundException('Storage file register not found!')
    }

    const presignedUrl = await this.s3.getUploadPresignedUrl(
      storageFile.fileKey
    )

    return {
      presignedUrl,
      storageFile,
    }
  }

  async updateStorageFile(
    id: string,
    data: StorageFileUpdateInput
  ): Promise<StorageFile> {
    const storageFile = {
      ...data,
    }

    return this.prisma.storageFile.update({
      where: { id },
      data: storageFile,
    })
  }

  // TODO: implements deleteStorageFile function
  // Check file validation (bucket file)
  // Delete file (bucket files)
  // Finally update StorageFile status to "DELETED"
}
