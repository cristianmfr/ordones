import { Button } from '@ordones/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShippingAddressForm, shippingAddressFormSchema } from '@/components/forms/shipping-address.form'
import { MapPinIcon, PlusIcon, TrashIcon } from 'lucide-react'
import type { z } from 'zod'

export const Route = createFileRoute('/(www)/profile/address/')({
  component: AddressPage,
})

type FormData = z.infer<typeof shippingAddressFormSchema>

function AddressPage() {
  const mockAddresses = [
    {
      id: '1',
      title: 'Casa',
      zipCode: '01234-567',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apartamento 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      isDefault: true
    },
    {
      id: '2',
      title: 'Trabalho',
      zipCode: '09876-543',
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Sala 1001',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      isDefault: false
    }
  ]

  const form = useForm<FormData>({
    resolver: zodResolver(shippingAddressFormSchema),
    defaultValues: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  })

  const handleSubmit = (values: FormData) => {
    console.log('New address:', values)
  }

  const handleDeleteAddress = (id: string) => {
    console.log('Delete address:', id)
  }

  return (
    <div className="flex flex-col w-full items-center justify-start">
      <div className="grid grid-cols-10 w-full gap-4">
        <div className="col-span-6 col-start-3 mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seus endereços</CardTitle>
              <CardDescription>
                Gerencie os endereços salvos em sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAddresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-primary" />
                      <Label className="font-medium">{address.title}</Label>
                      {address.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Padrão
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{address.street}, {address.number} {address.complement && `- ${address.complement}`}</p>
                    <p>{address.neighborhood}, {address.city} - {address.state}</p>
                    <p>CEP: {address.zipCode}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Adicionar novo endereço
              </CardTitle>
              <CardDescription>
                Adicione um novo endereço à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShippingAddressForm
                form={form}
                onSubmit={handleSubmit}
                actions={
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Adicionar endereço
                    </Button>
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
