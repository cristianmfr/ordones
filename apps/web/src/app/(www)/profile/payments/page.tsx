import { Button } from '@ordones/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { Badge } from '@ordones/ui/components/badge'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentForm, paymentFormSchema } from '@/components/forms/payment-form'
import { 
  CreditCardIcon, 
  PlusIcon, 
  TrashIcon,
  ShieldCheckIcon,
  CalendarIcon,
  StarIcon
} from 'lucide-react'
import type { z } from 'zod'

export const Route = createFileRoute('/(www)/profile/payments/')({
  component: PaymentsPage,
})

type FormData = z.infer<typeof paymentFormSchema>

interface PaymentMethod {
  id: string
  type: 'credit' | 'debit'
  brand: 'visa' | 'mastercard' | 'amex' | 'elo'
  lastFourDigits: string
  expiryMonth: string
  expiryYear: string
  cardName: string
  isDefault: boolean
  isExpired: boolean
}

function PaymentsPage() {
  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'credit',
      brand: 'visa',
      lastFourDigits: '1234',
      expiryMonth: '12',
      expiryYear: '26',
      cardName: 'JOAO SILVA',
      isDefault: true,
      isExpired: false
    },
    {
      id: '2',
      type: 'debit',
      brand: 'mastercard',
      lastFourDigits: '5678',
      expiryMonth: '08',
      expiryYear: '25',
      cardName: 'JOAO SILVA',
      isDefault: false,
      isExpired: false
    },
    {
      id: '3',
      type: 'credit',
      brand: 'elo',
      lastFourDigits: '9012',
      expiryMonth: '03',
      expiryYear: '24',
      cardName: 'JOAO SILVA',
      isDefault: false,
      isExpired: true
    }
  ]

  const form = useForm<FormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardName: ''
    }
  })

  const handleSubmit = (values: FormData) => {
    console.log('New payment method:', values)
  }

  const handleDeleteCard = (id: string) => {
    console.log('Delete card:', id)
  }

  const getBrandIcon = (brand: PaymentMethod['brand']) => {
    return <CreditCardIcon className="w-5 h-5" />
  }

  const getBrandName = (brand: PaymentMethod['brand']) => {
    switch (brand) {
      case 'visa':
        return 'Visa'
      case 'mastercard':
        return 'Mastercard'
      case 'amex':
        return 'American Express'
      case 'elo':
        return 'Elo'
    }
  }

  const getCardType = (type: PaymentMethod['type']) => {
    return type === 'credit' ? 'Crédito' : 'Débito'
  }

  return (
    <div className="flex flex-col w-full items-center justify-start">
      <div className="grid grid-cols-10 w-full gap-4">
        <div className="col-span-6 col-start-3 mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="w-5 h-5" />
                Métodos de pagamento
              </CardTitle>
              <CardDescription>
                Gerencie seus cartões e métodos de pagamento salvos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPaymentMethods.map((card) => (
                <div key={card.id} className={`border rounded-lg p-4 space-y-3 ${card.isExpired ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getBrandIcon(card.brand)}
                      <div>
                        <Label className="font-medium">
                          {getBrandName(card.brand)} •••• {card.lastFourDigits}
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getCardType(card.type)}
                          </Badge>
                          {card.isDefault && (
                            <Badge variant="default" className="text-xs flex items-center gap-1">
                              <StarIcon className="w-3 h-3" />
                              Padrão
                            </Badge>
                          )}
                          {card.isExpired && (
                            <Badge variant="destructive" className="text-xs">
                              Expirado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Válido até {card.expiryMonth}/{card.expiryYear}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>{card.cardName}</span>
                    </div>
                  </div>
                </div>
              ))}

              {mockPaymentMethods.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCardIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Você ainda não possui métodos de pagamento salvos</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Adicionar cartão
              </CardTitle>
              <CardDescription>
                Adicione um novo cartão para facilitar suas compras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentForm
                form={form}
                onSubmit={handleSubmit}
                actions={
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Adicionar cartão
                    </Button>
                  </div>
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Segurança
              </CardTitle>
              <CardDescription>
                Informações sobre a segurança dos seus dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                <ShieldCheckIcon className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Seus dados estão protegidos</Label>
                  <p className="text-xs text-muted-foreground">
                    Utilizamos criptografia de ponta e não armazenamos informações sensíveis do seu cartão.
                    Todos os pagamentos são processados de forma segura por nossos parceiros certificados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
