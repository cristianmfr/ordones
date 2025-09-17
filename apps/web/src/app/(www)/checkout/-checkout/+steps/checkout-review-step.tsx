import { useQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FrenetShippingRequest, getShippingQuote } from '@ordones/frenet'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { Form } from '@ordones/ui/components/form'
import { Separator } from '@ordones/ui/components/separator'
import { TextFieldWithMask } from '@ordones/ui/components/text-field-with-mask'
import { IconSearch } from '@tabler/icons-react'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import type { ShippingOption } from '@/components/shipping/shipping-card'
import { ShippingOptionTable } from '@/components/shipping/shipping-table'
import { PRODUCT } from '@/graphql/queries/products.queries'
import { useCartItems, useCartTotal } from '@/hooks/use-cart-store.hook'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'

interface CheckoutReviewStepProps {
  onNext: () => void
}

const shippingFormSchema = z.object({
  zipCode: z.string(),
})

export function CheckoutReviewStep({ onNext }: CheckoutReviewStepProps) {
  const cartItems = useCartItems()
  const cartTotal = useCartTotal()

  const [shippingQuote, setShippingQuote] = useState<ShippingOption[]>()
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null)
  const [quoteLoading, setQuoteLoading] = useState(false)

  const form = useForm<z.infer<typeof shippingFormSchema>>({
    resolver: zodResolver(shippingFormSchema),
  })

  const { data } = useQuery(PRODUCT, {
    variables: {
      productId: cartItems?.[0]?.id,
    },
  })

  const handleFetchShippingQuote = (
    values: z.infer<typeof shippingFormSchema>
  ) => {
    setQuoteLoading(true)

    const payload: FrenetShippingRequest = {
      SellerCEP: '01310-100',
      RecipientCEP: values.zipCode,
      ShipmentInvoiceValue: data?.product.price || 100,
      ShippingServiceCode: null,
      ShippingItemArray: [
        {
          Height: 10,
          Length: 20,
          Quantity: 1,
          Weight: 0.5,
          Width: 15,
          SKU: data?.product.id,
          Category: 'Electronics',
        },
      ],
      RecipientCountry: 'BR',
    }

    getShippingQuote(payload)
      .then(data => {
        const quote: ShippingOption[] = data.ShippingSevicesArray.map(item => ({
          name: item.Carrier,
          value: parseFloat(item.ShippingPrice),
          time: parseInt(item.DeliveryTime),
        }))
        setShippingQuote(quote)
      })
      .catch(error => {
        toast.error('Erro ao simular o frete. Tente novamente.')
        console.error(error)
      })
      .finally(() => {
        setQuoteLoading(false)
      })
  }

  const shippingCost = selectedShipping?.value || 0
  const finalTotal = cartTotal + shippingCost

  const handleNext = () => {
    const reviewData = {
      items: cartItems,
      subtotal: cartTotal,
      shippingCost,
      total: finalTotal,
      zipCode: form.getValues('zipCode'),
      selectedShipping,
    }

    console.log('Review step data:', reviewData)
    onNext()
  }

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Revisar itens do pedido</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-3'>
            {cartItems.map(item => (
              <div key={item.id} className='flex items-center gap-4'>
                <div className='size-16 overflow-hidden rounded-lg'>
                  <img
                    src={
                      item.image ||
                      `https://placehold.co/200x200?text=${item.name}`
                    }
                    alt={item.name}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex-1 space-y-1'>
                  <p className='font-medium leading-tight'>{item.name}</p>
                  <p className='text-muted-foreground text-sm'>
                    Quantidade: {item.quantity}
                  </p>
                  <p className='text-sm font-medium'>
                    {formatToBRL(item.price)} cada
                  </p>
                </div>
                <p className='text-primary font-bold'>
                  {formatToBRL(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <Separator />

          <div className='flex justify-between font-medium'>
            <span>Subtotal</span>
            <span>{formatToBRL(cartTotal)}</span>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-2 gap-4'>
        <Card className='border-none'>
          <CardHeader>
            <CardTitle>
              <span className='flex items-center gap-2'>
                <MapPin className='text-primary' />
                Simule frete e prazo de entrega
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex w-full flex-col gap-4'>
              <div className='flex w-full items-center gap-2'>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleFetchShippingQuote)}
                    className='flex items-center gap-2'>
                    <TextFieldWithMask
                      name='zipCode'
                      control={form.control}
                      placeholder='Informe seu CEP'
                      mask='99999-999'
                    />
                    <Button
                      type='submit'
                      size='icon'
                      isLoading={quoteLoading}
                      disabled={quoteLoading}>
                      <IconSearch />
                    </Button>
                  </form>
                </Form>
              </div>

              {shippingQuote && (
                <>
                  <Separator />
                  <div className='bg-accent/50 flex w-full flex-col gap-4 rounded-lg p-4'>
                    <span className='ml-2 mt-2 flex items-center gap-2 font-semibold leading-none'>
                      Opções de frete para{' '}
                      <div className='text-primary flex items-center justify-center font-semibold'>
                        Vitória, ES
                      </div>
                    </span>
                    <div className='flex w-full flex-col gap-2'>
                      <ShippingOptionTable
                        data={shippingQuote || []}
                        selectedShipping={selectedShipping}
                        onShippingSelect={setSelectedShipping}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Subtotal</span>
                <span>{formatToBRL(cartTotal)}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Frete</span>
                <span>
                  {selectedShipping ? formatToBRL(shippingCost) : 'A calcular'}
                </span>
              </div>
              <Separator />
              <div className='flex justify-between text-lg font-bold'>
                <span>Total</span>
                <span className='text-primary'>
                  {selectedShipping
                    ? formatToBRL(finalTotal)
                    : formatToBRL(cartTotal)}
                </span>
              </div>
            </div>

            <Button
              className='mt-4 w-full'
              onClick={handleNext}
              disabled={!selectedShipping}>
              Continuar para endereço
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
