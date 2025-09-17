import { useQuery } from '@apollo/client'
import { Card, CardContent } from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { RegisterForm } from '@/components/forms/register-form'
import { VALIDATE_TOKEN } from '@/graphql/queries/auth.queries'

export const Route = createFileRoute('/(www)/(auth)/register/$validationToken')(
  {
    component: RegisterPage,
  }
)

function RegisterPage() {
  const { validationToken } = Route.useParams()
  const router = useRouter()

  const { data: validateTokenQuery, loading: isFetchingToken } = useQuery(
    VALIDATE_TOKEN,
    {
      variables: {
        token: validationToken,
      },
    }
  )

  useEffect(() => {
    if (!isFetchingToken && !validateTokenQuery?.validateUserEmailToken) {
      router.navigate({ to: '/' })
    }
  }, [validateTokenQuery, isFetchingToken, router])

  if (isFetchingToken) {
    return (
      <div className='flex flex-col w-full h-full items-center justify-center'>
        <Loader2 className='animate-spin size-6 text-muted-foreground' />
      </div>
    )
  }

  if (!validateTokenQuery?.validateUserEmailToken) {
    return (
      <div className='flex flex-col w-full h-full items-center justify-center'>
        <Loader2 className='animate-spin size-6 text-muted-foreground' />
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-4'>
      <Card>
        <CardContent className='w-full max-w-[480px]'>
          <div className='flex flex-col w-full items-center justify-center gap-2'>
            <div className='flex flex-col items-center justify-center mb-2'>
              <Label className='text-lg font-semibold'>Crie sua conta</Label>
              <Label className='text-sm font-light text-muted-foreground'>
                Digite seu nome, sobrenome e crie uma senha para concluir
              </Label>
            </div>
            <RegisterForm
              email={validateTokenQuery?.validateUserEmailToken}
              token={validationToken}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
