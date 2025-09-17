import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ordones/ui/components/tabs'
import { IconLogin, IconMapPin, IconUser } from '@tabler/icons-react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  PersonalDataForm,
  personalDataFormSchema,
} from '@/components/forms/personal-data.form'
import {
  ShippingAddressForm,
  shippingAddressFormSchema,
} from '@/components/forms/shipping-address.form'

interface CheckoutAddressStepProps {
  onNext: () => void
  onBack: () => void
}

export function CheckoutAddressStep({
  onNext,
  onBack,
}: CheckoutAddressStepProps) {
  const [activeTab, setActiveTab] = useState('check-login')
  const isAuthenticated = !!Cookies.get('access_token')

  const personalDataForm = useForm({
    resolver: zodResolver(personalDataFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  })

  const shippingAddressForm = useForm({
    resolver: zodResolver(shippingAddressFormSchema),
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

  const handleLogin = () => {
    console.log('Redirecionando para login...')
  }

  const handleContinueAsGuest = () => {
    console.log('Continuando como convidado')
    setActiveTab('personal-data')
  }

  const handlePersonalDataSubmit = (data: any) => {
    console.log('Dados pessoais:', data)
    setActiveTab('address')
  }

  const handleAddressSubmit = (data: any) => {
    console.log('Endereço de entrega:', data)

    const addressData = {
      isAuthenticated,
      personalData: personalDataForm.getValues(),
      shippingAddress: data,
    }

    console.log('Address step data:', addressData)
    onNext()
  }

  if (isAuthenticated) {
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconMapPin className='h-5 w-5' />
              Selecionar endereço de entrega
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='hover:border-primary cursor-pointer rounded-lg border p-4 transition-colors'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Endereço principal</p>
                    <p className='text-muted-foreground text-sm'>
                      Rua das Flores, 123 - Centro, São Paulo - SP, 01234-567
                    </p>
                  </div>
                  <input type='radio' name='address' defaultChecked />
                </div>
              </div>

              <div className='hover:border-primary cursor-pointer rounded-lg border p-4 transition-colors'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Trabalho</p>
                    <p className='text-muted-foreground text-sm'>
                      Av. Paulista, 456 - Bela Vista, São Paulo - SP, 01310-100
                    </p>
                  </div>
                  <input type='radio' name='address' />
                </div>
              </div>
            </div>

            <Button
              variant='outline'
              className='w-full'
              onClick={() => setActiveTab('new-address')}>
              + Adicionar novo endereço
            </Button>

            <div className='flex gap-2'>
              <Button variant='outline' onClick={onBack} className='flex-1'>
                Voltar
              </Button>
              <Button onClick={onNext} className='flex-1'>
                Continuar para pagamento
              </Button>
            </div>
          </CardContent>
        </Card>

        {activeTab === 'new-address' && (
          <Card>
            <CardHeader>
              <CardTitle>Novo endereço</CardTitle>
            </CardHeader>
            <CardContent>
              <ShippingAddressForm
                form={shippingAddressForm}
                onSubmit={handleAddressSubmit}
                actions={
                  <div className='flex gap-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setActiveTab('check-login')}
                      className='flex-1'>
                      Cancelar
                    </Button>
                    <Button type='submit' className='flex-1'>
                      Salvar e continuar
                    </Button>
                  </div>
                }
              />
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className='grid h-full w-full grid-cols-12'>
      <div className='col-span-6 col-start-4 w-full space-y-6'>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='check-login'>Login</TabsTrigger>
            <TabsTrigger
              value='personal-data'
              disabled={activeTab === 'check-login'}>
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value='address' disabled={activeTab !== 'address'}>
              Endereço
            </TabsTrigger>
          </TabsList>

          <TabsContent value='check-login'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconLogin className='h-5 w-5' />
                  Já tem uma conta?
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-muted-foreground'>
                  Faça login para usar seus endereços salvos e acompanhar seu
                  pedido.
                </p>

                <div className='flex gap-2'>
                  <Button onClick={handleLogin} className='flex-1'>
                    Fazer login
                  </Button>
                  <Button
                    variant='outline'
                    onClick={handleContinueAsGuest}
                    className='flex-1'>
                    Continuar como convidado
                  </Button>
                </div>

                <Button variant='outline' onClick={onBack} className='w-full'>
                  Voltar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='personal-data'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconUser className='h-5 w-5' />
                  Dados pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalDataForm
                  form={personalDataForm}
                  onSubmit={handlePersonalDataSubmit}
                  actions={
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => setActiveTab('check-login')}
                        className='flex-1'>
                        Voltar
                      </Button>
                      <Button type='submit' className='flex-1'>
                        Continuar
                      </Button>
                    </div>
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='address'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconMapPin className='h-5 w-5' />
                  Endereço de entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ShippingAddressForm
                  form={shippingAddressForm}
                  onSubmit={handleAddressSubmit}
                  actions={
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => setActiveTab('personal-data')}
                        className='flex-1'>
                        Voltar
                      </Button>
                      <Button type='submit' className='flex-1'>
                        Continuar para pagamento
                      </Button>
                    </div>
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
