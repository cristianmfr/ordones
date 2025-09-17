import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuthentication } from './use-authentication.hook'

export const useProtectedRoute = () => {
  const { isAuthenticated } = useAuthentication()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    }
  }, [isAuthenticated, navigate])

  return { isAuthenticated }
}
