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
import { IconHeart } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useWishlistCount, useWishlistItems } from '@/hooks/use-wishlist.hook'
import { clearWishlist } from '@/store/wishlist-local.store'
import { WishlistItem } from './wishlist-item'

export function WishlistSheet() {
  const wishlistItems = useWishlistItems()
  const wishlistCount = useWishlistCount()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type='button' variant='ghost' className='relative'>
          <IconHeart />
          {wishlistCount > 0 && (
            <Badge className='text-primary absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#302814] p-0 text-xs'>
              {wishlistCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-lg'>Lista de desejos</SheetTitle>
        </SheetHeader>
        <div className='-mt-4 flex h-full w-full flex-col gap-4 px-4'>
          {wishlistItems.length === 0 ? (
            <div className='flex h-full flex-col items-center justify-center py-8 text-center'>
              <IconHeart className='text-muted-foreground/50 mb-4 h-12 w-12' />
              <p className='text-muted-foreground'>
                Sua lista de desejos está vazia
              </p>
              <p className='text-muted-foreground/70 text-sm'>
                Adicione produtos que você gostaria de comprar mais tarde
              </p>
            </div>
          ) : (
            wishlistItems.map(item => (
              <WishlistItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>
        <SheetFooter className='p-4'>
          <div className='grid grid-cols-2 gap-2'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => clearWishlist()}>
              Limpar lista
            </Button>
            <Button type='button' asChild>
              <Link to='/'>Todos os items</Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
