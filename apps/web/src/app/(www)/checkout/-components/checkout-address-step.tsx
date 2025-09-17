import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { Form } from '@ordones/ui/components/form'
import { Label } from '@ordones/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@ordones/ui/components/radio-group'
import { TextField } from '@ordones/ui/components/text-field'
import { TextFieldWithMask } from '@ordones/ui/components/text-field-with-mask'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const addressSchema = z.object({
  zipCode: z.string().min(8, 'CEP deve ter 8 dígitos'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z
    .string()
    .min(2, 'Estado é obrigatório')
    .max(2, 'Estado deve ter 2 caracteres'),
})

type Address = {
  id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

interface CheckoutAddressStepProps {
  onNext: () => void
  onPrevious: () => void
  onUpdate: (data: { addressId: string }) => void
  onAddressSaved: (address: Address) => void
  savedAddresses: Address[]
}

export function CheckoutAddressStep({
  onNext,
  onPrevious,
  onUpdate,
  onAddressSaved,
  savedAddresses,
}: CheckoutAddressStepProps) {
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [showNewAddressForm, setShowNewAddressForm] = useState(
    savedAddresses.length === 0
  )
  const [isLoadingCep, setIsLoadingCep] = useState(false)

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId)
    setShowNewAddressForm(false)
    onUpdate({ addressId })
  }

  const handleShowNewForm = () => {
    setShowNewAddressForm(true)
    setSelectedAddressId('')
    form.reset()
  }

  const handleCepSearch = async () => {
    const cep = form.getValues('zipCode')
    const cleanCep = cep.replace(/\D/g, '')

    if (cleanCep.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos')
      return
    }

    setIsLoadingCep(true)

    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${cleanCep}`
      )
      const data = await response.json()

      if (response.ok && data.cep) {
        form.setValue('street', data.street || '')
        form.setValue('neighborhood', data.neighborhood || '')
        form.setValue('city', data.city || '')
        form.setValue('state', data.state || '')
      } else {
        alert('CEP não encontrado. Por favor, verifique o CEP digitado.')
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      alert('Erro ao buscar CEP. Tente novamente.')
    } finally {
      setIsLoadingCep(false)
    }
  }

  const handleCreateAddress = (values: z.infer<typeof addressSchema>) => {
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      street: values.street,
      number: values.number,
      complement: values.complement,
      neighborhood: values.neighborhood,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
    }

    console.log('Novo endereço criado:', newAddress)

    // Salva o endereço no estado global
    onAddressSaved(newAddress)

    // Seleciona automaticamente o endereço criado
    setSelectedAddressId(newAddress.id)
    setShowNewAddressForm(false)
    onUpdate({ addressId: newAddress.id })
  }

  const handleNext = () => {
    if (showNewAddressForm) {
      form.handleSubmit(handleCreateAddress)()
      return
    }

    if (!selectedAddressId) {
      alert('Por favor, selecione um endereço')
      return
    }

    onNext()
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold'>Endereço de entrega</h2>

      <div className='space-y-4'>
        {/* Endereços salvos */}
        {savedAddresses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Endereços salvos</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAddressId}
                onValueChange={handleAddressSelect}>
                {savedAddresses.map(address => (
                  <div
                    key={address.id}
                    className='flex items-start space-x-3 border rounded-lg p-4'>
                    <RadioGroupItem
                      value={address.id}
                      id={`address-${address.id}`}
                      className='mt-1'
                    />
                    <Label
                      htmlFor={`address-${address.id}`}
                      className='flex-1 cursor-pointer'>
                      <div className='space-y-1'>
                        <p className='font-medium'>
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {address.neighborhood} - {address.city},{' '}
                          {address.state}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          CEP: {address.zipCode}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Novo endereço */}
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Novo endereço</CardTitle>
          </CardHeader>
          <CardContent>
            {!showNewAddressForm ? (
              <Button
                variant='outline'
                className='w-full'
                onClick={handleShowNewForm}>
                Adicionar novo endereço
              </Button>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCreateAddress)}
                  className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='md:col-span-2'>
                      <div className='flex items-end gap-2'>
                        <div className='flex-1'>
                          <TextFieldWithMask
                            name='zipCode'
                            control={form.control}
                            label='CEP'
                            placeholder='00000-000'
                            mask='99999-999'
                            disabled={isLoadingCep}
                          />
                        </div>
                        <div className='flex flex-col'>
                          <Label className='text-transparent'>Buscar</Label>
                          <Button
                            type='button'
                            size='icon'
                            variant='outline'
                            onClick={handleCepSearch}
                            disabled={isLoadingCep}>
                            <Search className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                      {isLoadingCep && (
                        <p className='text-xs text-muted-foreground mt-1'>
                          Buscando endereço...
                        </p>
                      )}
                    </div>

                    <div className='md:col-span-2'>
                      <TextField
                        name='street'
                        control={form.control}
                        label='Rua'
                        placeholder='Rua das Flores'
                      />
                    </div>

                    <TextField
                      name='number'
                      control={form.control}
                      label='Número'
                      placeholder='123'
                    />

                    <TextField
                      name='complement'
                      control={form.control}
                      label='Complemento (opcional)'
                      placeholder='Apto 45'
                    />

                    <TextField
                      name='neighborhood'
                      control={form.control}
                      label='Bairro'
                      placeholder='Centro'
                    />

                    <TextField
                      name='city'
                      control={form.control}
                      label='Cidade'
                      placeholder='São Paulo'
                    />

                    <TextField
                      name='state'
                      control={form.control}
                      label='Estado'
                      placeholder='SP'
                      maxLength={2}
                    />
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setShowNewAddressForm(false)}
                      className='flex-1'>
                      Cancelar
                    </Button>
                    <Button
                      type='submit'
                      variant='secondary'
                      className='flex-1'>
                      Usar este endereço
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='flex items-center gap-4'>
        <Button variant='outline' onClick={onPrevious} className='flex-1'>
          Voltar
        </Button>
        <Button onClick={handleNext} className='flex-1'>
          Continuar
        </Button>
      </div>
    </div>
  )
}
