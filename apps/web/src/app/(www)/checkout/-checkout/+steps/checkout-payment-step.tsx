import { PaymentForm, paymentFormSchema } from '@/components/forms/payment.form'
import { useCartItems, useCartTotal } from '@/hooks/use-cart-store.hook'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@ordones/ui/components/radio-group'
import { Separator } from '@ordones/ui/components/separator'
import { IconBarcode, IconCreditCard } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface CheckoutPaymentStepProps {
  onNext: () => void
  onBack: () => void
}

export function CheckoutPaymentStep({
  onNext,
  onBack,
}: CheckoutPaymentStepProps) {
  const cartItems = useCartItems()
  const cartTotal = useCartTotal()
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [installments, setInstallments] = useState('1')

  const shippingCost = 15.9
  const finalTotal = cartTotal + shippingCost

  const paymentForm = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardName: '',
    },
  })

  const handlePaymentSubmit = (data: any) => {
    console.log('Dados de pagamento:', data)

    const paymentData = {
      method: paymentMethod,
      installments: installments,
      cardData: paymentMethod === 'credit-card' ? data : null,
      amount: finalTotal,
    }

    console.log('Payment step data:', paymentData)
    onNext()
  }

  const generateInstallmentOptions = () => {
    const maxInstallments = 12
    const options = []

    for (let i = 1; i <= maxInstallments; i++) {
      const value = finalTotal / i
      options.push({
        value: i.toString(),
        label: `${i}x de ${formatToBRL(value)}${i === 1 ? ' á vista' : ''}`,
      })
    }

    return options
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Forma de pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label
                htmlFor="credit-card"
                className="flex cursor-pointer items-center gap-2"
              >
                <IconCreditCard className="h-4 w-4" />
                Cartão de crédito
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="pix" />
              <Label
                htmlFor="pix"
                className="flex cursor-pointer items-center gap-2"
              >
                <IconBarcode className="h-4 w-4" />
                PIX (5% de desconto)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boleto" id="boleto" />
              <Label
                htmlFor="boleto"
                className="flex cursor-pointer items-center gap-2"
              >
                <IconBarcode className="h-4 w-4" />
                Boleto bancário
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'credit-card' && (
            <div className="space-y-4 border-t pt-4">
              <PaymentForm form={paymentForm} onSubmit={handlePaymentSubmit} />

              <div className="space-y-4">
                <Label htmlFor="installments">Parcelamento</Label>
                <RadioGroup
                  value={installments}
                  onValueChange={setInstallments}
                >
                  {generateInstallmentOptions()
                    .slice(0, 6)
                    .map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`installment-${option.value}`}
                        />
                        <Label
                          htmlFor={`installment-${option.value}`}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="border-t pt-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-medium text-blue-900">
                  Pagamento via PIX
                </h4>
                <p className="text-sm text-blue-700">
                  Valor com desconto:{' '}
                  <strong>{formatToBRL(finalTotal * 0.95)}</strong>
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'boleto' && (
            <div className="border-t pt-4">
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h4 className="mb-2 font-medium text-yellow-900">
                  Pagamento via Boleto
                </h4>
                <p className="mb-2 text-sm text-yellow-700">
                  O boleto será enviado por email após a confirmação do pedido.
                </p>
                <p className="text-sm text-yellow-700">
                  Prazo de vencimento: 3 dias úteis
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Resumo do pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>{formatToBRL(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatToBRL(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete</span>
              <span>{formatToBRL(shippingCost)}</span>
            </div>
            {paymentMethod === 'pix' && (
              <div className="flex justify-between text-green-600">
                <span>Desconto PIX (5%)</span>
                <span>-{formatToBRL(finalTotal * 0.05)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">
                {paymentMethod === 'pix'
                  ? formatToBRL(finalTotal * 0.95)
                  : formatToBRL(finalTotal)}
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button
              onClick={() => {
                if (paymentMethod === 'credit-card') {
                  paymentForm.handleSubmit(handlePaymentSubmit)()
                } else {
                  handlePaymentSubmit({})
                }
              }}
              className="flex-1"
            >
              Finalizar pedido
            </Button>
            <Button variant="outline" onClick={onBack} className="flex-1">
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
