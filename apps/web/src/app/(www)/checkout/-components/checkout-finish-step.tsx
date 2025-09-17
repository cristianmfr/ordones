import { Button } from '@ordones/ui/components/button'
import { Check, CreditCard, MapPin, Truck } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_ORDER } from '@/graphql/mutations/order.mutations'
import { useCartItems, useCartTotal } from '@/hooks/use-cart-store.hook'
import { useAuthentication } from '@/hooks/use-authentication.hook'
import { clearCart } from '@/store/cart-local.store'

type Address = {
  id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

interface CheckoutFinishStepProps {
  checkoutData: {
    addressId: string
    paymentMethod: string
    shippingMethodId: string
  }
  shippingQuotes?: {
    address: string
    options: Array<{
      carrier: string
      price: string
      days: string
    }>
  } | null
  savedAddresses: Address[]
  onPrevious: () => void
}

const paymentMethodNames: Record<string, string> = {
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
  PIX: 'PIX',
  BANK_TRANSFER: 'Transferência Bancária',
}

export function CheckoutFinishStep({ checkoutData, shippingQuotes, savedAddresses, onPrevious }: CheckoutFinishStepProps) {
  const [createOrder, { loading: creatingOrder }] = useMutation(CREATE_ORDER)
  const { isAuthenticated } = useAuthentication()
  const cartItems = useCartItems()
  const cartTotal = useCartTotal()
  const [orderCreated, setOrderCreated] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100)
  }

  const selectedAddress = savedAddresses.find(addr => addr.id === checkoutData.addressId)
  const selectedShippingOption = shippingQuotes?.options.find(option => option.carrier === checkoutData.shippingMethodId)
  const shippingCost = selectedShippingOption ? parseFloat(selectedShippingOption.price) * 100 : 0 // Converter para centavos
  const totalWithShipping = cartTotal + shippingCost

  const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      console.log('Dados do pedido (usuário não logado):', {
        items: cartItems,
        address: selectedAddress,
        paymentMethod: checkoutData.paymentMethod,
        shippingMethod: selectedShippingOption,
        total: totalWithShipping,
      })
      setOrderCreated(true)
      clearCart()
      return
    }

    try {
      const orderNumber = generateOrderNumber()

      const { data } = await createOrder({
        variables: {
          data: {
            orderNumber,
            total: totalWithShipping / 100, // Converter centavos para reais
            shippingAddressId: checkoutData.addressId,
            shippingMethodId: checkoutData.shippingMethodId,
          }
        }
      })

      console.log('Pedido criado:', data?.orderCreate)
      setOrderCreated(true)
      clearCart()
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      alert('Erro ao finalizar pedido. Tente novamente.')
    }
  }

  if (orderCreated) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Pedido finalizado com sucesso!</h2>
        <p className="text-muted-foreground mb-8">
          {isAuthenticated
            ? 'Você receberá um e-mail de confirmação em breve.'
            : 'Os dados do pedido foram exibidos no console para análise.'
          }
        </p>
        <Button asChild>
          <a href="/orders">Ver meus pedidos</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Resumo do pedido</h2>

      {/* Endereço de entrega */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Endereço de entrega</h3>
        </div>
        {selectedAddress && (
          <div className="ml-8 text-sm">
            <p>{selectedAddress.street}, {selectedAddress.number}
              {selectedAddress.complement && ` - ${selectedAddress.complement}`}
            </p>
            <p>{selectedAddress.neighborhood} - {selectedAddress.city}, {selectedAddress.state}</p>
            <p>CEP: {selectedAddress.zipCode}</p>
          </div>
        )}
      </div>

      {/* Método de entrega */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Método de entrega</h3>
        </div>
        {selectedShippingOption ? (
          <div className="ml-8 text-sm space-y-1">
            <div className="flex justify-between">
              <span>{selectedShippingOption.carrier}</span>
              <span className="font-medium">{formatPrice(parseFloat(selectedShippingOption.price) * 100)}</span>
            </div>
            <div className="text-muted-foreground">
              {selectedShippingOption.days} dias úteis
            </div>
            {shippingQuotes?.address && (
              <div className="text-muted-foreground">
                Entrega para: {shippingQuotes.address}
              </div>
            )}
          </div>
        ) : (
          <div className="ml-8 text-sm text-muted-foreground">
            Método de entrega não selecionado
          </div>
        )}
      </div>

      {/* Método de pagamento */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Método de pagamento</h3>
        </div>
        <div className="ml-8 text-sm">
          <span>{paymentMethodNames[checkoutData.paymentMethod] || checkoutData.paymentMethod}</span>
        </div>
      </div>

      {/* Resumo financeiro */}
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-medium">Resumo financeiro</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Frete</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(totalWithShipping)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex-1"
          disabled={creatingOrder}
        >
          Voltar
        </Button>
        <Button
          onClick={handleCreateOrder}
          className="flex-1"
          isLoading={creatingOrder}
          disabled={creatingOrder}
        >
          Finalizar pedido
        </Button>
      </div>
    </div>
  )
}