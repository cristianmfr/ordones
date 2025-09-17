import { z } from 'zod'

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3000),
  WEB_BASE_URL: z.string().default('http://localhost:3000'),
  ADM_BASE_URL: z.string().default('http://localhost:3001'),
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string().default('default-secret-key'),
  JWT_SECRET_APP: z.string().default('default-secret-app'),
  FRENET_TOKEN: z.string(),
  S3_BUCKET_NAME: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_ACCOUNT_ID: z.string(),
  RESEND_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
