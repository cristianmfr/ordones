import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import { Card, CardContent } from '@ordones/ui/components/card'
import { Form } from '@ordones/ui/components/form'
import { Label } from '@ordones/ui/components/label'
import { TextField } from '@ordones/ui/components/text-field'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { REGISTER_USER_EMAIL } from '@/graphql/mutations/auth.mutations'
import { middleware } from '@/middleware'

export const Route = createFileRoute('/(www)/(auth)/register/')({
  component: RegisterEmailPage,
  beforeLoad: ({ location }) => {
    return middleware(location.pathname)
  },
})

const formSchema = z.object({
  email: z.email(),
})

function RegisterEmailSuccess() {
  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-4'>
      <Card>
        <CardContent className='w-full max-w-[480px]'>
          <div className='flex flex-col w-full items-center justify-center gap-2'>
            <Label className='text-lg font-semibold'>
              Confirmação de e-mail
            </Label>
            <Label className='text-sm font-light text-muted-foreground text-center'>
              Enviamos um email de confirmação para o seu endereço. Verifique
              sua caixa de entrada e clique no link para continuar seu cadastro.
            </Label>
            <Button className='mt-2' variant='secondary' asChild>
              <Link to='/login'>Voltar para o login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RegisterEmailPage() {
  const [handleCreateTokenAndSend] = useMutation(REGISTER_USER_EMAIL)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [onSuccess, setOnSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onCreateTokenAndSend = async (values: z.infer<typeof formSchema>) => {
    setIsSendingEmail(true)

    handleCreateTokenAndSend({
      variables: {
        email: values.email,
      },
    })
      .then(() => {
        setOnSuccess(true)
        sessionStorage.setItem('USER-REGISTRATION-EMAIL', values.email)
      })
      .catch(error => {
        toast.error('Erro ao enviar o email. Tente novamente.')
        console.error(error)
      })
      .finally(() => {
        setIsSendingEmail(false)
      })
  }

  if (onSuccess) {
    return <RegisterEmailSuccess />
  }

  return (
    <div className='flex flex-col w-full items-center justify-center gap-4 mt-[12rem] mb-[12rem]'>
      <Card>
        <CardContent className='w-full max-w-[480px]'>
          <div className='flex flex-col w-full items-center justify-center gap-2'>
            <div className='flex flex-col h-full items-center justify-center'>
              <Label className='text-lg font-semibold'>Criar conta</Label>
              <Label className='text-sm font-light text-muted-foreground'>
                Digite seu e-mail para receber um link de confirmação
              </Label>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onCreateTokenAndSend)}
                className='grid w-full gap-3'>
                <TextField
                  name='email'
                  control={form.control}
                  placeholder='m@email.com'
                  disabled={isSendingEmail}
                />
                <Button
                  className='w-full'
                  isLoading={isSendingEmail}
                  disabled={isSendingEmail}>
                  Enviar
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
