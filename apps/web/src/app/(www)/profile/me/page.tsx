import { useMutation, useQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { DatePickerField } from '@ordones/ui/components/date-picker-field'
import { Form } from '@ordones/ui/components/form'
import { TextField } from '@ordones/ui/components/text-field'
import { TextFieldWithMask } from '@ordones/ui/components/text-field-with-mask'
import { createFileRoute } from '@tanstack/react-router'
import { IdCardIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { USER_UPDATE } from '@/graphql/mutations/user.mutations'
import { USER_AUTHENTICATED } from '@/graphql/queries/user.queries'
import { checkDocumentInputHelper } from '@/utils/helpers/check-document-input.helper'

export const Route = createFileRoute('/(www)/profile/me/')({
  component: MePage,
})

const formSchema = z.object({
  document: z.string().min(1, 'CPF é obrigatório'),
  birthdate: z.date(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
})

function MePage() {
  const [onUserUpdate] = useMutation(USER_UPDATE)
  const { data: currentUserQuery, loading: isLoadingCurrentUser } =
    useQuery(USER_AUTHENTICATED)

  const currentUser = currentUserQuery?.userAuthenticated

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: '',
      name: '',
      email: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (currentUser) {
      form.reset({
        birthdate: currentUser.birthdate,
        document: currentUser.document ?? '',
        name: currentUser.name ?? '',
        email: currentUser.email ?? '',
        phone: currentUser.phone ?? '',
      })
    }
  }, [currentUser, form])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const { document, ...rest } = values
    const documentType =
      document.length === 11 ? 'CPF' : document.length === 12 ? 'CNH' : 'RG'

    onUserUpdate({
      variables: {
        userUpdateId: currentUser?.id,
        data: {
          documentNumber: document,
          documentType,
          ...rest,
        },
      },
    })
      .then(() => {
        toast.success('Dados atualizados com sucesso!')
      })
      .catch(error => {
        console.error(error)
        toast.error('Erro ao atualizar dados. Tente novamente.')
      })
  }

  return (
    <div className='flex flex-col w-full h-[48rem] items-center justify-center'>
      <div className='grid grid-cols-10 w-full gap-4'>
        <div className='col-span-6 col-start-3 mt-4 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <IdCardIcon className='w-5 h-5' />
                Informações pessoais
              </CardTitle>
              <CardDescription>
                Documentos de identidade e informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <TextField
                      name='name'
                      control={form.control}
                      label='Nome'
                      placeholder='Nome do usuário'
                      isLoading={isLoadingCurrentUser}
                    />
                    <TextField
                      name='email'
                      control={form.control}
                      label='Email'
                      placeholder='m@example.com'
                      isLoading={isLoadingCurrentUser}
                    />
                  </div>
                  <div className='grid gap-4 md:grid-cols-3'>
                    <TextFieldWithMask
                      name='phone'
                      control={form.control}
                      label='Telefone'
                      placeholder='+55 00 0 0000-0000'
                      mask='+55 99 9 9999-9999'
                    />
                    <TextFieldWithMask
                      name='document'
                      control={form.control}
                      label='Documento'
                      placeholder='000.000.000-00'
                      mask={checkDocumentInputHelper(form.watch('document'))}
                    />
                    <DatePickerField
                      name='birthdate'
                      control={form.control}
                      placeholder='00/00/0000'
                      label='Data de nascimento'
                    />
                  </div>
                  <div className='flex justify-end gap-2 pt-4'>
                    <Button type='button' variant='outline'>
                      Cancelar
                    </Button>
                    <Button type='submit'>Salvar alterações</Button>
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
