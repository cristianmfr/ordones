import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { Separator } from '@ordones/ui/components/separator'
import { IconCheck, IconDownload, IconMail } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { clearCart } from '@/store/cart-local.store'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'

interface CheckoutFinishStepProps {
  orderData?: {
    orderId: string
    items: any[]
    total: number
    paymentMethod: string
  }
}

export function CheckoutFinishStep({ orderData }: CheckoutFinishStepProps) {
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false)
      clearCart()

      const generatedOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`

      const finalOrderData = {
        orderId: generatedOrderId,
        status: 'confirmed',
        paymentStatus: 'pending',
        estimatedDelivery: '5-7 dias �teis',
        trackingCode: `BR${Math.random().toString().substring(2, 15)}`,
        ...orderData,
      }

      console.log('Pedido finalizado:', finalOrderData)

      sessionStorage.setItem('lastOrder', JSON.stringify(finalOrderData))
    }, 3000)

    return () => clearTimeout(timer)
  }, [orderData])

  if (isProcessing) {
    return (
      <div className='space-y-6'>
        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-4 text-center'>
              <div className='border-primary mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent' />
              <h2 className='text-xl font-bold'>Processando seu pedido...</h2>
              <p className='text-muted-foreground'>
                Aguarde enquanto confirmamos seu pagamento e finalizamos seu
                pedido.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const mockOrderData = {
    orderId: 'ORD-' + Date.now().toString(36).toUpperCase(),
    status: 'confirmed',
    paymentStatus: 'approved',
    items: [
      { name: 'Produto Exemplo', quantity: 2, price: 99.9 },
      { name: 'Outro Produto', quantity: 1, price: 149.9 },
    ],
    subtotal: 349.7,
    shipping: 15.9,
    total: 365.6,
    paymentMethod: 'Cart�o de cr�dito',
    estimatedDelivery: '5-7 dias �teis',
    email: 'cliente@exemplo.com',
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardContent className='pt-6'>
          <div className='space-y-4 text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
              <IconCheck className='h-8 w-8 text-green-600' />
            </div>
            <div>
              <h2 className='mb-2 text-2xl font-bold text-green-700'>
                Pedido confirmado!
              </h2>
              <p className='text-muted-foreground'>
                Seu pedido foi realizado com sucesso.
              </p>
            </div>
            <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
              <p className='font-medium text-green-800'>
                N�mero do pedido:{' '}
                <span className='font-mono'>{mockOrderData.orderId}</span>
              </p>
              <p className='mt-1 text-sm text-green-700'>
                Enviamos um email de confirma��o para {mockOrderData.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo do pedido</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-3'>
            {mockOrderData.items.map((item, index) => (
              <div key={index} className='flex justify-between'>
                <span className='text-sm'>
                  {item.name} (x{item.quantity})
                </span>
                <span className='text-sm font-medium'>
                  {formatToBRL(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>{formatToBRL(mockOrderData.subtotal)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Frete</span>
              <span>{formatToBRL(mockOrderData.shipping)}</span>
            </div>
            <Separator />
            <div className='flex justify-between text-lg font-bold'>
              <span>Total pago</span>
              <span className='text-primary'>
                {formatToBRL(mockOrderData.total)}
              </span>
            </div>
          </div>

          <div className='space-y-3 pt-4'>
            <div className='text-sm'>
              <strong>Forma de pagamento:</strong> {mockOrderData.paymentMethod}
            </div>
            <div className='text-sm'>
              <strong>Status do pagamento:</strong>{' '}
              <span className='capitalize text-green-600'>
                {mockOrderData.paymentStatus}
              </span>
            </div>
            <div className='text-sm'>
              <strong>Prazo de entrega:</strong>{' '}
              {mockOrderData.estimatedDelivery}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-4 pt-6'>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
            <Button variant='outline' className='flex items-center gap-2'>
              <IconMail className='h-4 w-4' />
              Reenviar email
            </Button>
            <Button variant='outline' className='flex items-center gap-2'>
              <IconDownload className='h-4 w-4' />
              Baixar comprovante
            </Button>
            <Button variant='outline' className='flex items-center gap-2'>
              Acompanhar pedido
            </Button>
          </div>

          <Separator />

          <div className='flex gap-3'>
            <Button asChild className='flex-1'>
              <Link to='/'>Continuar comprando</Link>
            </Button>
            <Button variant='outline' asChild className='flex-1'>
              <Link to='/'>Meus pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pr�ximos passos</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex items-start gap-3'>
            <div className='bg-primary mt-2 h-2 w-2 rounded-full' />
            <div>
              <p className='font-medium'>Confirmação por email</p>
              <p className='text-muted-foreground text-sm'>
                Você receberá um email com os detalhes do seu pedido em alguns
                minutos.
              </p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <div className='bg-primary mt-2 h-2 w-2 rounded-full' />
            <div>
              <p className='font-medium'>Preparação do pedido</p>
              <p className='text-muted-foreground text-sm'>
                Seus produtos ser�o separados e embalados com cuidado.
              </p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <div className='bg-primary mt-2 h-2 w-2 rounded-full' />
            <div>
              <p className='font-medium'>Envio e entrega</p>
              <p className='text-muted-foreground text-sm'>
                Voc� receber� o c�digo de rastreamento para acompanhar a
                entrega.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
