import { useQuery } from '@apollo/client'
import { Button } from '@ordones/ui/components/button'
import { Separator } from '@ordones/ui/components/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@ordones/ui/components/sheet'
import { IconShoppingCart } from '@tabler/icons-react'
import { Link, redirect, useNavigate } from '@tanstack/react-router'
import { PRODUCTS } from '@/graphql/queries/products.queries'
import { useCartParams } from '@/hooks/use-cart-params.hook'
import { useCartItems, useCartTotal } from '@/hooks/use-cart-store.hook'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'
import { centsToReal } from '@/utils/helpers/currency.helper'
import { CartItem } from './cart-item'
import { CartProduct } from './cart-product'

export function CartFinishSheet() {
  const { params, setParams } = useCartParams()
  const navigate = useNavigate()

  const { data } = useQuery(PRODUCTS, {
    variables: {
      query: {
        take: 3,
        skip: 0,
      },
    },
  })

  const cartItems = useCartItems()
  const cartTotal = useCartTotal()

  return (
    <Sheet open={!!params.buyProduct} onOpenChange={() => setParams(null)}>
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
              {/*<Separator />
              <div className='no-scrollbar flex-1 overflow-y-auto'>
                {data?.products.items.map(item => (
                  <CartProduct
                    key={item.id}
                    name={item.name}
                    price={centsToReal(item.price)}
                    image={item.images?.[0]?.presignedUrl ?? ''}
                  />
                ))}
              </div>*/}

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
          <Button type='button' asChild variant='secondary' className='w-full'>
            <Link to='/products'>Continuar comprando</Link>
          </Button>
          <Button
            type='button'
            onClick={() => {
              navigate({ to: '/checkout' })
              setParams(null)
            }}>
            Finalizar compra
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
