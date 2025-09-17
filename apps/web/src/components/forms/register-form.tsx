import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import { Form } from '@ordones/ui/components/form'
import { Input } from '@ordones/ui/components/input'
import { Label } from '@ordones/ui/components/label'
import { TextField } from '@ordones/ui/components/text-field'
import { redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useAuthentication } from '@/hooks/use-authentication.hook'
import { StrengthPassword } from '../strength-password'

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
})

export function RegisterForm({
  email,
  token,
}: {
  email: string
  token: string
}) {
  const { signUp } = useAuthentication()
  const [isRegistering, setIsRegistering] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsRegistering(true)

    const { firstName, lastName, password } = values
    const name = `${firstName} ${lastName}`

    await signUp(name, token, password)

    redirect({ to: '/' })
    return setIsRegistering(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid w-full gap-4'>
        <div className='space-y-2'>
          <Label>Email</Label>
          <Input value={email} defaultValue={email} disabled />
        </div>
        <TextField
          type='text'
          name='firstName'
          control={form.control}
          label='Nome'
          placeholder='Digite seu nome'
        />
        <TextField
          type='text'
          name='lastName'
          control={form.control}
          label='Sobrenome'
          placeholder='Digite seu sobrenome'
        />
        <StrengthPassword
          name='password'
          control={form.control}
          label='Crie uma senha'
          password={form.watch('password')}
        />
        <Button
          className='w-full mt-1'
          isLoading={isRegistering}
          disabled={isRegistering}>
          Criar conta
        </Button>
      </form>
    </Form>
  )
}
