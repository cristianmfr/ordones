import { Badge } from '@ordones/ui/components/badge'
import { Button } from '@ordones/ui/components/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ordones/ui/components/sheet'
import { IconShoppingCart } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import {
  useCartCount,
  useCartItems,
  useCartTotal,
} from '@/hooks/use-cart-store.hook'
import { clearCart } from '@/store/cart-local.store'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'
import { centsToReal } from '@/utils/helpers/currency.helper'
import { CartItem } from './cart-item'

export function CartSheet({
  hasBuyProduct = false,
}: {
  hasBuyProduct?: boolean
}) {
  const cartItems = useCartItems()
  const cartCount = useCartCount()
  const cartTotal = useCartTotal()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type='button' variant='ghost' className='relative'>
          <IconShoppingCart />
          {cartCount > 0 && (
            <Badge className='text-primary absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#302814] p-0 text-xs'>
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      {hasBuyProduct ? (
        <SheetContent>
          <SheetHeader>
            <SheetTitle className='text-lg'>Carrinho de compras</SheetTitle>
          </SheetHeader>
          <div className='-mt-4 flex h-full w-full flex-col gap-4 px-4'>
            {cartItems.length === 0 ? (
              <div className='flex h-full flex-col items-center justify-center py-8 text-center'>
                <IconShoppingCart className='text-muted-foreground/50 mb-4 h-12 w-12' />
                <p className='text-muted-foreground'>Seu carrinho está vazio</p>
                <p className='text-muted-foreground/70 text-sm'>
                  Adicione produtos para começar sua compra
                </p>
              </div>
            ) : (
              <>
                <div className='flex-1 overflow-y-auto'>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      image={item.image}
                    />
                  ))}
                </div>
                {cartTotal > 0 && (
                  <div className='border-t pt-4'>
                    <div className='mb-4 flex items-center justify-between'>
                      <span className='text-lg font-medium'>Total:</span>
                      <span className='text-primary text-xl font-bold'>
                        {formatToBRL(centsToReal(cartTotal))}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <SheetFooter className='p-4'>
            <Button type='button' asChild>
              <Link to='/checkout'>Finalizar compra</Link>
            </Button>
            <Button type='button' asChild className='w-full'>
              <Link to='/'>Continuar comprando</Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      ) : (
        <SheetContent>
          <SheetHeader>
            <SheetTitle className='text-lg'>Carrinho de compras</SheetTitle>
          </SheetHeader>
          <div className='-mt-4 flex h-full w-full flex-col gap-4 px-4'>
            {cartItems.length === 0 ? (
              <div className='flex h-full flex-col items-center justify-center py-8 text-center'>
                <IconShoppingCart className='text-muted-foreground/50 mb-4 h-12 w-12' />
                <p className='text-muted-foreground'>Seu carrinho está vazio</p>
                <p className='text-muted-foreground/70 text-sm'>
                  Adicione produtos para começar sua compra
                </p>
              </div>
            ) : (
              <>
                <div className='flex-1 overflow-y-auto'>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      image={item.image}
                    />
                  ))}
                </div>
                {cartTotal > 0 && (
                  <div className='border-t pt-4'>
                    <div className='mb-4 flex items-center justify-between'>
                      <span className='text-lg font-medium'>Total:</span>
                      <span className='text-primary text-xl font-bold'>
                        {formatToBRL(centsToReal(cartTotal))}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <SheetFooter className='p-4'>
            {cartItems.length > 0 ? (
              <div className='grid w-full grid-cols-2 gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => clearCart()}>
                  Limpar carrinho
                </Button>
                <Button type='button' asChild>
                  <Link to='/checkout'>Finalizar compra</Link>
                </Button>
              </div>
            ) : (
              <Button type='button' asChild className='w-full'>
                <Link to='/'>Ver produtos</Link>
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  )
}
