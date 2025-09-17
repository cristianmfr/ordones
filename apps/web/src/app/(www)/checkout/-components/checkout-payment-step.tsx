import { Button } from '@ordones/ui/components/button'
import { RadioGroup, RadioGroupItem } from '@ordones/ui/components/radio-group'
import { Label } from '@ordones/ui/components/label'
import { Card, CardContent, CardHeader, CardTitle } from '@ordones/ui/components/card'
import { Badge } from '@ordones/ui/components/badge'
import { CreditCard, DollarSign, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'

interface CheckoutPaymentStepProps {
  onNext: () => void
  onPrevious: () => void
  onUpdate: (data: { paymentMethod: string; shippingMethodId: string }) => void
  shippingQuotes?: {
    address: string
    options: Array<{
      carrier: string
      price: string
      days: string
    }>
  } | null
}

const paymentMethods = [
  {
    id: 'CREDIT_CARD',
    name: 'Cartão de Crédito',
    icon: CreditCard,
    description: 'Visa, Mastercard, Elo',
  },
  {
    id: 'DEBIT_CARD',
    name: 'Cartão de Débito',
    icon: CreditCard,
    description: 'Débito online',
  },
  {
    id: 'PIX',
    name: 'PIX',
    icon: Smartphone,
    description: 'Pagamento instantâneo',
  },
  {
    id: 'BANK_TRANSFER',
    name: 'Transferência Bancária',
    icon: DollarSign,
    description: 'Boleto bancário',
  },
]

export function CheckoutPaymentStep({ onNext, onPrevious, onUpdate, shippingQuotes }: CheckoutPaymentStepProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('')

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    onUpdate({
      paymentMethod: method,
      shippingMethodId: selectedShippingMethod
    })
  }

  const handleShippingMethodSelect = (carrier: string) => {
    setSelectedShippingMethod(carrier)
    onUpdate({
      paymentMethod: selectedPaymentMethod,
      shippingMethodId: carrier
    })
  }

  const handleNext = () => {
    if (!selectedPaymentMethod) {
      alert('Por favor, selecione um método de pagamento')
      return
    }
    if (shippingQuotes && shippingQuotes.options.length > 0 && !selectedShippingMethod) {
      alert('Por favor, selecione um método de entrega')
      return
    }
    onNext()
  }

  return (
    <div className="space-y-8">
      {/* Método de entrega */}
      {shippingQuotes && shippingQuotes.options.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Método de entrega</CardTitle>
            <p className="text-sm text-muted-foreground">
              Entrega para: {shippingQuotes.address}
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedShippingMethod}
              onValueChange={handleShippingMethodSelect}
            >
              <div className="space-y-3">
                {shippingQuotes.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 border rounded-lg p-4"
                  >
                    <RadioGroupItem
                      value={option.carrier}
                      id={`shipping-${index}`}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`shipping-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {option.carrier}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {option.days} dias úteis
                          </span>
                        </div>
                        <span className="font-medium">
                          {formatToBRL(option.price)}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Aviso se não há cotação de frete */}
      {(!shippingQuotes || shippingQuotes.options.length === 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Método de entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Calcule o frete na etapa anterior para ver as opções de entrega disponíveis.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Método de pagamento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Método de pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedPaymentMethod}
            onValueChange={handlePaymentMethodSelect}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-start space-x-3 border rounded-lg p-4"
                >
                  <RadioGroupItem
                    value={method.id}
                    id={`payment-${method.id}`}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`payment-${method.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <method.icon className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1"
          disabled={!selectedPaymentMethod}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}