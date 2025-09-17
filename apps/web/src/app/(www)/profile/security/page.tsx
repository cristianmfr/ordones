import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { Form } from '@ordones/ui/components/form'
import { SecureField } from '@ordones/ui/components/secure-field'
import { createFileRoute } from '@tanstack/react-router'
import { KeyIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { StrengthPassword } from '@/components/strength-password'

export const Route = createFileRoute('/(www)/profile/security/')({
  component: SecurityPage,
})

const formSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(8, 'Nova senha deve ter pelo menos 8 caracteres'),
})

function SecurityPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const handlePasswordChange = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div className='flex flex-col w-full items-center justify-start'>
      <div className='grid grid-cols-10 w-full gap-4'>
        <div className='col-span-6 col-start-3 mt-4 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <KeyIcon className='w-5 h-5' />
                Alterar senha
              </CardTitle>
              <CardDescription>
                Atualize sua senha para manter sua conta segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handlePasswordChange)}
                  className='space-y-4'>
                  <SecureField
                    name='currentPassword'
                    control={form.control}
                    label='Senha atual'
                    placeholder='Digite sua senha atual'
                    isRequired
                  />

                  <StrengthPassword
                    name='newPassword'
                    control={form.control}
                    label='Nova senha'
                    password={form.watch('newPassword')}
                  />

                  <div className='flex justify-end gap-2 pt-4'>
                    <Button type='button' variant='outline'>
                      Cancelar
                    </Button>
                    <Button type='submit'>Alterar senha</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
