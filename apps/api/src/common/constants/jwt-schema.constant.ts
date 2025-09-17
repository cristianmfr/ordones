import { env } from '../../config/env.config'

export const jwtSchema = {
  secret: env.JWT_SECRET_KEY,
  secretApp: env.JWT_SECRET_APP,
}
