import { Card, CardContent } from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/forms/login-form'
import { middleware } from '@/middleware'

export const Route = createFileRoute('/(www)/(auth)/login/')({
  component: LoginPage,
  beforeLoad: ({ location }) => {
    return middleware(location.pathname)
  },
})

function LoginPage() {
  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-4 mt-[12rem] mb-[12rem]'>
      <div className='flex flex-col items-center justify-center'>
        <Label className='text-lg font-semibold'>Entre na sua conta</Label>
        <Label className='text-sm font-light text-muted-foreground'>
          Digite seu e-mail e senha para iniciar sessão
        </Label>
      </div>
      <Card className='w-full max-w-sm'>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
