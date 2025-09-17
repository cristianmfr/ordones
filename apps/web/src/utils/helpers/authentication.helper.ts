import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface AuthenticationHelperSchema {
  checkAuth: () => Promise<boolean>
  isTokenExpired: () => boolean
  isTokenNearExpiration: () => boolean
  decodeToken: (token: string) => JWTPayload | null
}

interface JWTPayload {
  email: string
  userId: string
  organizationId: string
  iat: number
  exp: number
}

export const AuthenticationHelper = (): AuthenticationHelperSchema => {
  const decodeToken = (token: string): JWTPayload | null => {
    try {
      return jwtDecode<JWTPayload>(token)
    } catch {
      return null
    }
  }

  const isTokenExpired = (): boolean => {
    try {
      const accessToken = Cookies.get('access_token')

      if (!accessToken) {
        return true
      }

      const decodedToken = decodeToken(accessToken)
      if (!decodedToken) {
        return true
      }

      const currentTime = Math.floor(Date.now() / 1000)
      return decodedToken.exp ? decodedToken.exp < currentTime : true
    } catch {
      return true
    }
  }

  const isTokenNearExpiration = (): boolean => {
    try {
      const accessToken = Cookies.get('access_token')

      if (!accessToken) {
        return true
      }

      const decodedToken = decodeToken(accessToken)
      if (!decodedToken) {
        return true
      }

      const currentTime = Math.floor(Date.now() / 1000)
      const fiveMinutesInSeconds = 5 * 60

      return decodedToken.exp
        ? decodedToken.exp - currentTime < fiveMinutesInSeconds
        : true
    } catch {
      return true
    }
  }

  const checkAuth = async (): Promise<boolean> => {
    try {
      const accessToken = Cookies.get('access_token')

      if (!accessToken) {
        throw new Error('Unauthorized')
      }

      const decodedToken = decodeToken(accessToken)
      if (!decodedToken) {
        Cookies.remove('access_token')
        throw new Error('Invalid token')
      }

      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        Cookies.remove('access_token')
        throw new Error('Token expired')
      }

      return true
    } catch (error) {
      Cookies.remove('access_token')
      throw error
    }
  }

  return {
    checkAuth,
    isTokenExpired,
    isTokenNearExpiration,
    decodeToken,
  }
}
