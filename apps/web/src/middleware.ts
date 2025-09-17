import { redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { AuthenticationHelper } from '@/utils/helpers/authentication.helper'

const privateRoutes = ['/profile', '/profile/*']

const authenticationRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
]

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login'

export async function middleware(pathname: string) {
  const token = Cookies.get('access_token')

  if (pathname === REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE && token) {
    throw redirect({
      to: '/',
    })
  }

  if (pathname === REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE) {
    return
  }

  const middleware = AuthenticationHelper()
  const authRoute = authenticationRoutes.find(route => route.path === pathname)
  const isPrivateRoute = privateRoutes.some(route => {
    if (route.endsWith('/*')) {
      return pathname.startsWith(route.replace('/*', ''))
    }
    return pathname === route
  })

  try {
    const isAuthenticated = await middleware.checkAuth()

    if (!isAuthenticated && isPrivateRoute) {
      throw redirect({
        to: REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
      })
    }

    if (
      isAuthenticated &&
      authRoute &&
      authRoute.whenAuthenticated === 'redirect'
    ) {
      throw redirect({
        to: '/',
      })
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('redirect')) {
      throw error
    }

    if (isPrivateRoute) {
      throw redirect({
        to: REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
      })
    }
  }
}
