import { useMutation } from '@apollo/client'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import { SIGN_IN, SIGN_UP } from '@/graphql/mutations/auth.mutations'

interface AuthenticationSchema {
  signIn: (
    email: string,
    password: string
  ) => Promise<{ code: number; message: string } | undefined>
  signUp: (
    name: string,
    token: string,
    password: string
  ) => Promise<{ code: number; message: string } | undefined>
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthentication = (): AuthenticationSchema => {
  const [authenticate] = useMutation(SIGN_IN)
  const [register] = useMutation(SIGN_UP)
  const navigate = useNavigate()

  const isAuthenticated = useMemo(() => {
    const token = Cookies.get('access_token')
    return !!token
  }, [])

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await authenticate({
          variables: {
            email,
            password,
          },
        })

        const accessToken = data?.signIn

        if (!accessToken) {
          throw new Error('Error getting authentication token')
        }

        Cookies.set('access_token', accessToken)

        toast.success('Login realizado com sucesso!')

        window.location.reload()

        return {
          code: 200,
          message: 'Authentication successfully',
        }
      } catch (error) {
        console.error(error)

        toast.error('Erro ao realizar login')

        return {
          code: 401,
          message: 'Error when authenticating',
        }
      }
    },
    [authenticate, navigate]
  )

  const signUp = useCallback(
    async (name: string, token: string, password: string) => {
      try {
        const { data } = await register({
          variables: {
            user: {
              name,
              token,
              password,
            },
          },
        })

        const accessToken = data?.signUp.accessToken

        if (!accessToken) {
          throw new Error('Error getting authentication token')
        }

        Cookies.set('access_token', accessToken)

        toast.success('Cadastro realizado com sucesso!')

        window.location.reload()

        return {
          code: 200,
          message: 'Authentication successfully',
        }
      } catch (error) {
        console.error(error)

        toast.error('Erro ao criar conta. Tente novamente')

        return {
          code: 401,
          message: 'Error when authenticating',
        }
      }
    },
    [authenticate, navigate]
  )

  const logout = useCallback(() => {
    try {
      Cookies.remove('access_token')
      navigate({ to: '/login' })
    } catch (error) {
      console.error(error)
      navigate({ to: '/' })
    }
  }, [navigate])

  return {
    signUp,
    signIn,
    logout,
    isAuthenticated,
  }
}
