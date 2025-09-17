import { useLazyQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Badge } from '@ordones/ui/components/badge'
import { Button } from '@ordones/ui/components/button'
import { Card, CardContent } from '@ordones/ui/components/card'
import { Form } from '@ordones/ui/components/form'
import { Label } from '@ordones/ui/components/label'
import { Separator } from '@ordones/ui/components/separator'
import { TextFieldWithMask } from '@ordones/ui/components/text-field-with-mask'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
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

export function ProductShippingQuote({ productId }: { productId: string }) {
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const [hasShippingQuote, setHasShippingQuote] = useState(false)
  const [shippingQuotes, setShippingQuotes] = useState<QuoteOptions>()

  const [fetchShippingQuotes] = useLazyQuery(PRODUCT_SHIPPING_QUOTE)

  const form = useForm<z.infer<typeof shippingQuoteSchema>>({
    resolver: zodResolver(shippingQuoteSchema),
  })

  const handleFetchQuote = async (
    values: z.infer<typeof shippingQuoteSchema>
  ) => {
    setIsLoadingQuote(true)

    await fetchShippingQuotes({
      variables: {
        productId: productId,
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
      })
      .catch(error => {
        toast.error('Erro ao buscar o frete')
        console.error(error)
      })
      .finally(() => {
        setIsLoadingQuote(false)
      })
  }

  return (
    <Card>
      <CardContent>
        <div className='flex flex-col w-full gap-4'>
          <div className='flex flex-col w-full gap-2'>
            <Label>Frete e Entrega</Label>
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
  )
}
