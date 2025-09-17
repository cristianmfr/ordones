import { z } from 'zod'

const envSchema = z.object({
  VITE_GRAPHQL_URL: z.url(),
  VITE_WS_URL: z.url(),
})

export const env = envSchema.parse(import.meta.env)
