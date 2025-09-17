import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { env } from 'src/config/env.config'

@Injectable()
export class S3Service {
  private client: S3Client
  private bucketName = env.S3_BUCKET_NAME

  constructor() {
    const region = 'auto'
    const accessKeyId = env.S3_ACCESS_KEY_ID
    const secretAccessKey = env.S3_SECRET_KEY
    const accountId = env.S3_ACCOUNT_ID

    this.client = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    })
  }

  async getUploadPresignedUrl(key: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 60 * 60 * 24,
      })

      return url
    } catch (error) {
      console.error('Error generating presigned URL:', error)
      throw new Error('Failed to generate upload URL')
    }
  }

  async getDownloadPresignedUrl(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 60 * 60 * 24,
      })

      return url
    } catch (error) {
      console.error('Error generating presigned URL:', error)
      throw new Error('Failed to generate upload URL')
    }
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.client.send(command)

      return { message: 'File deleted successfully' }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to delete file',
      )
    }
  }
}
