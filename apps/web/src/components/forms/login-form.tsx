import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import { Form } from '@ordones/ui/components/form'
import { SecureField } from '@ordones/ui/components/secure-field'
import { Separator } from '@ordones/ui/components/separator'
import { TextField } from '@ordones/ui/components/text-field'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useAuthentication } from '@/hooks/use-authentication.hook'

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export function LoginForm() {
  const { signIn } = useAuthentication()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsAuthenticating(true)

    const { email, password } = values
    await signIn(email, password)

    return setIsAuthenticating(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid w-full gap-4'>
        <TextField
          name='email'
          control={form.control}
          label='Email'
          placeholder='m@email.com'
        />
        <SecureField
          name='password'
          control={form.control}
          label='Senha'
          placeholder='************'
        />
        <Button
          className='w-full'
          isLoading={isAuthenticating}
          disabled={isAuthenticating}>
          Entrar
        </Button>
        <div className='flex items-center justify-center relative my-2'>
          <p className='text-muted-foreground/70 text-xs absolute bg-[#131313] px-2 -mb-0.5'>
            Não tem uma conta?
          </p>
          <Separator />
        </div>
        <Button
          type='button'
          className='w-full'
          variant='secondary'
          isLoading={isAuthenticating}
          disabled={isAuthenticating}
          asChild>
          <Link to='/register'>Criar conta</Link>
        </Button>
      </form>
    </Form>
  )
}
