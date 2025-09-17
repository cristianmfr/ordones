import { Form } from '@ordones/ui/components/form'
import { TextField } from '@ordones/ui/components/text-field'
import type { ReactElement } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import z from 'zod'

export const shippingAddressFormSchema = z.object({
  zipCode: z.string().min(1, 'CEP é obrigatório'),
  street: z.string().min(1, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
})

type FormData = z.infer<typeof shippingAddressFormSchema>

export function ShippingAddressForm({
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
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='md:col-span-1'>
            <TextField
              name='zipCode'
              control={form.control}
              label='CEP'
              placeholder='00000-000'
              isRequired
            />
          </div>
          <div className='md:col-span-2'>
            <TextField
              name='street'
              control={form.control}
              label='Endereço'
              placeholder='Rua, Avenida...'
              isRequired
            />
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <div>
            <TextField
              name='number'
              control={form.control}
              label='Número'
              placeholder='123'
              isRequired
            />
          </div>
          <div className='md:col-span-2'>
            <TextField
              name='complement'
              control={form.control}
              label='Complemento'
              placeholder='Apartamento, casa...'
            />
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <div>
            <TextField
              name='neighborhood'
              control={form.control}
              label='Bairro'
              placeholder='Centro'
              isRequired
            />
          </div>
          <div>
            <TextField
              name='city'
              control={form.control}
              label='Cidade'
              placeholder='São Paulo'
              isRequired
            />
          </div>
          <div>
            <TextField
              name='state'
              control={form.control}
              label='Estado'
              placeholder='SP'
              isRequired
            />
          </div>
        </div>
        {actions}
      </form>
    </Form>
  )
}
