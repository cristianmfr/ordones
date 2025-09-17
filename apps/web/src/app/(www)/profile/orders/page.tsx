import { Badge } from '@ordones/ui/components/badge'
import { Button } from '@ordones/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  PackageIcon,
  ShoppingBagIcon,
  TruckIcon,
  XCircleIcon,
} from 'lucide-react'

export const Route = createFileRoute('/(www)/profile/orders/')({
  component: OrdersPage,
})

interface Order {
  id: string
  orderNumber: string
  date: string
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
  total: number
  items: {
    name: string
    quantity: number
    price: number
    image?: string
  }[]
  shippingAddress: string
  trackingCode?: string
}

function OrdersPage() {
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.9,
      items: [
        { name: 'Smartphone Samsung Galaxy A54', quantity: 1, price: 299.9 },
      ],
      shippingAddress: 'Rua das Flores, 123 - Centro, São Paulo - SP',
      trackingCode: 'BR123456789',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 159.9,
      items: [
        { name: 'Fone de Ouvido Bluetooth', quantity: 1, price: 89.9 },
        { name: 'Carregador Portátil', quantity: 1, price: 70.0 },
      ],
      shippingAddress: 'Avenida Paulista, 1000 - Bela Vista, São Paulo - SP',
      trackingCode: 'BR987654321',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-25',
      status: 'preparing',
      total: 89.9,
      items: [{ name: 'Capa para Smartphone', quantity: 2, price: 44.95 }],
      shippingAddress: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '2024-01-28',
      status: 'cancelled',
      total: 199.9,
      items: [{ name: 'Tablet Android 10"', quantity: 1, price: 199.9 }],
      shippingAddress: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    },
  ]

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className='w-4 h-4' />
      case 'confirmed':
        return <CheckCircleIcon className='w-4 h-4' />
      case 'preparing':
        return <PackageIcon className='w-4 h-4' />
      case 'shipped':
        return <TruckIcon className='w-4 h-4' />
      case 'delivered':
        return <CheckCircleIcon className='w-4 h-4' />
      case 'cancelled':
        return <XCircleIcon className='w-4 h-4' />
    }
  }

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'confirmed':
        return 'Confirmado'
      case 'preparing':
        return 'Preparando'
      case 'shipped':
        return 'Enviado'
      case 'delivered':
        return 'Entregue'
      case 'cancelled':
        return 'Cancelado'
    }
  }

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary' as const
      case 'confirmed':
        return 'default' as const
      case 'preparing':
        return 'default' as const
      case 'shipped':
        return 'default' as const
      case 'delivered':
        return 'default' as const
      case 'cancelled':
        return 'destructive' as const
    }
  }

  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId)
  }

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <div className='grid grid-cols-10 w-full gap-4'>
        <div className='col-span-6 col-start-3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ShoppingBagIcon className='w-5 h-5' />
                Seus pedidos
              </CardTitle>
              <CardDescription>
                Acompanhe o status dos seus pedidos realizados na Ordones
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {mockOrders.map(order => (
                <div key={order.id} className='border rounded-lg p-4 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Label className='font-semibold'>
                        {order.orderNumber}
                      </Label>
                      <Badge
                        variant={getStatusVariant(order.status)}
                        className='flex items-center gap-1'>
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Label className='text-sm text-muted-foreground'>
                        {new Date(order.date).toLocaleDateString('pt-BR')}
                      </Label>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleViewOrder(order.id)}>
                        <EyeIcon className='w-4 h-4 mr-1' />
                        Ver detalhes
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className='flex justify-between items-center text-sm'>
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className='flex justify-between items-center pt-2 border-t'>
                    <div className='text-sm text-muted-foreground'>
                      <p>Endereço: {order.shippingAddress}</p>
                      {order.trackingCode && (
                        <p>
                          Código de rastreamento:{' '}
                          <span className='font-mono'>
                            {order.trackingCode}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className='text-right'>
                      <Label className='text-lg font-semibold'>
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}

              {mockOrders.length === 0 && (
                <div className='text-center py-8 text-muted-foreground'>
                  <ShoppingBagIcon className='w-12 h-12 mx-auto mb-4 opacity-50' />
                  <p>Você ainda não realizou nenhum pedido</p>
                  <Button className='mt-4' asChild>
                    <Link to='/products'>Começar a comprar</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
