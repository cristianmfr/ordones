import { Form } from '@ordones/ui/components/form'
import { TextField } from '@ordones/ui/components/text-field'
import type { ReactElement } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import z from 'zod'

export const paymentFormSchema = z.object({
  cardNumber: z.string().min(1, 'Número do cartão é obrigatório'),
  expiryMonth: z.string().min(1, 'Mês é obrigatório'),
  expiryYear: z.string().min(1, 'Ano é obrigatório'),
  cvv: z.string().min(3, 'CVV é obrigatório'),
  cardName: z.string().min(1, 'Nome no cartão é obrigatório'),
})

type FormData = z.infer<typeof paymentFormSchema>

export function PaymentForm({
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
        <TextField
          name='cardNumber'
          control={form.control}
          label='Número do cartão'
          placeholder='0000 0000 0000 0000'
          isRequired
        />
        <div className='grid gap-4 md:grid-cols-3'>
          <TextField
            name='expiryMonth'
            control={form.control}
            label='Mês'
            placeholder='MM'
            isRequired
          />
          <TextField
            name='expiryYear'
            control={form.control}
            label='Ano'
            placeholder='AA'
            isRequired
          />
          <TextField
            name='cvv'
            control={form.control}
            label='CVV'
            placeholder='123'
            isRequired
          />
        </div>
        <TextField
          name='cardName'
          control={form.control}
          label='Nome no cartão'
          placeholder='Como está no cartão'
          isRequired
        />
        {actions}
      </form>
    </Form>
  )
}
