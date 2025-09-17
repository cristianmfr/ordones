import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import {
  PersonalDataForm,
  personalDataFormSchema,
} from '@/components/forms/personal-data.form'

export const Route = createFileRoute('/(www)/profile/account/')({
  component: AccountPage,
})

type FormData = z.infer<typeof personalDataFormSchema>

function AccountPage() {
  const mockUserData = {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
  }

  const form = useForm<FormData>({
    resolver: zodResolver(personalDataFormSchema),
    defaultValues: mockUserData,
  })

  const handleSubmit = (values: FormData) => {
    console.log('Account data updated:', values)
  }

  return (
    <div className='flex flex-col w-full h-[48rem] items-center justify-center'>
      <div className='grid grid-cols-10 w-full gap-4'>
        <div className='col-span-6 col-start-3 mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Sua conta</CardTitle>
              <CardDescription>
                Gerencie as informações da sua conta na Ordones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalDataForm
                form={form}
                onSubmit={handleSubmit}
                actions={
                  <div className='flex justify-end gap-2 pt-4'>
                    <Button type='button' variant='outline'>
                      Cancelar
                    </Button>
                    <Button type='submit'>Salvar alterações</Button>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
