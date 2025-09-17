import { Form } from '@ordones/ui/components/form'
import { TextField } from '@ordones/ui/components/text-field'
import type { ReactElement } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import z from 'zod'

export const personalDataFormSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
})

type FormData = z.infer<typeof personalDataFormSchema>

export function PersonalDataForm({
  form,
  actions,
  onSubmit,
}: {
  form: UseFormReturn<FormData>
  actions?: ReactElement
  onSubmit: (values: FormData) => void
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid gap-4 md:grid-cols-2'>
          <TextField
            name='firstName'
            control={form.control}
            label='Nome'
            placeholder='Seu nome'
            isRequired
          />
          <TextField
            name='lastName'
            control={form.control}
            label='Sobrenome'
            placeholder='Seu sobrenome'
            isRequired
          />
        </div>
        <TextField
          name='email'
          control={form.control}
          label='Email'
          placeholder='seu@email.com'
          type='email'
          isRequired
        />
        <TextField
          name='phone'
          control={form.control}
          label='Telefone'
          placeholder='(11) 99999-9999'
          isRequired
        />
        {actions}
      </form>
    </Form>
  )
}
