import { Button } from '@ordones/ui/components/button'
import { Card, CardContent } from '@ordones/ui/components/card'
import { Form } from '@ordones/ui/components/form'
import { Label } from '@ordones/ui/components/label'
import { Separator } from '@ordones/ui/components/separator'
import { TextFieldWithMask } from '@ordones/ui/components/text-field-with-mask'
import { Badge } from '@ordones/ui/components/badge'
import { Trash2, Plus, Minus, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLazyQuery } from '@apollo/client'
import { toast } from 'sonner'
import z from 'zod'
import { useCartItems, useCartTotal } from '@/hooks/use-cart-store.hook'
import { updateCartItemQuantity, removeFromCart } from '@/store/cart-local.store'
import { PRODUCT_SHIPPING_QUOTE } from '@/graphql/queries/products.queries'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'

const shippingQuoteSchema = z.object({
  recipientCep: z.string(),
})

type ShippingQuote = {
  carrier: string
  price: string
  days: string
}

type QuoteOptions = {
  address: string
  options: ShippingQuote[]
}

interface CheckoutReviewStepProps {
  onNext: () => void
  onShippingQuote?: (quote: QuoteOptions | null) => void
}

export function CheckoutReviewStep({ onNext, onShippingQuote }: CheckoutReviewStepProps) {
  const items = useCartItems()
  const total = useCartTotal()
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const [hasShippingQuote, setHasShippingQuote] = useState(false)
  const [shippingQuotes, setShippingQuotes] = useState<QuoteOptions>()

  const [fetchShippingQuotes] = useLazyQuery(PRODUCT_SHIPPING_QUOTE)

  const form = useForm<z.infer<typeof shippingQuoteSchema>>({
    resolver: zodResolver(shippingQuoteSchema),
  })

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100)
  }

  const handleFetchQuote = async (
    values: z.infer<typeof shippingQuoteSchema>
  ) => {
    if (items.length === 0) {
      toast.error('Adicione produtos ao carrinho para calcular o frete')
      return
    }

    setIsLoadingQuote(true)

    // Usar o primeiro produto do carrinho para calcular o frete
    const firstProduct = items[0]

    await fetchShippingQuotes({
      variables: {
        productId: firstProduct.id,
        sellerCep: '29090640',
        recipientCep: values.recipientCep,
      },
    })
      .then(({ data }) => {
        const quotes: QuoteOptions = {
          address: data?.productShippingQuote.RecipientAddress || '',
          options:
            data?.productShippingQuote.ShippingSevicesArray.map(quote => ({
              carrier: quote.ServiceDescription,
              days: quote.OriginalDeliveryTime,
              price: quote.OriginalShippingPrice,
            })) || [],
        }

        setHasShippingQuote(true)
        setShippingQuotes(quotes)
        onShippingQuote?.(quotes)
      })
      .catch(error => {
        toast.error('Erro ao buscar o frete')
        console.error(error)
      })
      .finally(() => {
        setIsLoadingQuote(false)
      })
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
        <p className="text-muted-foreground mb-8">
          Adicione produtos ao carrinho para continuar
        </p>
        <Button variant="outline" asChild>
          <a href="/products">Ver produtos</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Revisar carrinho</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
              <p className="text-sm font-medium mt-1">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{item.quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <p className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleRemoveItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Simulação de frete */}
      <Card>
        <CardContent>
          <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-col w-full gap-2'>
              <Label>Calcular frete</Label>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFetchQuote)}
                className='flex items-center gap-2 w-full'>
                <TextFieldWithMask
                  name='recipientCep'
                  control={form.control}
                  placeholder='Informar um CEP'
                  className='w-full'
                  mask='99999-999'
                />
                <Button size='icon' variant='outline' isLoading={isLoadingQuote}>
                  <SearchIcon />
                </Button>
              </form>
            </Form>
            {hasShippingQuote && (
              <div className='flex flex-col w-full gap-4'>
                <Separator />
                <div className='flex w-full gap-2'>
                  <Label className='font-normal'>Opções de frete para:</Label>
                  <Label className='font-semibold'>
                    {shippingQuotes?.address}
                  </Label>
                </div>
                {shippingQuotes?.options.map((quote, index) => (
                  <div key={index} className='flex items-center w-full gap-2'>
                    <div className='flex items-center justify-center text-xs font-light'>
                      <Badge
                        variant='outline'
                        className='text-xs px-3 py-1 rounded-full'>
                        {quote.carrier}
                      </Badge>
                    </div>
                    <div className='flex items-center justify-center text-xs font-semibold'>
                      {formatToBRL(quote.price)} - {quote.days} dias úteis
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} size="lg">
          Continuar
        </Button>
      </div>
    </div>
  )
}