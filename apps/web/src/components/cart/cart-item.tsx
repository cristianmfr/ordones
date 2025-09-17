import { Button } from '@ordones/ui/components/button'
import { Label } from '@ordones/ui/components/label'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { updateCartItemQuantity } from '@/store/cart-local.store'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'
import { centsToReal } from '@/utils/helpers/currency.helper'

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
}: {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}) {
  const totalPrice = price * quantity

  return (
    <div className='bg-card/30 hover:border-primary relative flex w-full items-center gap-4 rounded-lg border p-4 transition ease-in'>
      <div className='size-18 aspect-square overflow-hidden rounded-lg'>
        <img
          src={image ? image : `https://placehold.co/1200x1200?text=${name}`}
          alt={name}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <Label className='font-medium'>{name}</Label>
        <Label className='text-primary text-lg font-bold'>
          {formatToBRL(centsToReal(totalPrice))}
        </Label>
        <div className='mt-2 flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              updateCartItemQuantity(id, Math.max(1, quantity - 1))
            }
            className='h-7 w-7 p-0'>
            <IconMinus className='h-3 w-3' />
          </Button>
          <span className='w-8 text-center text-sm font-medium'>
            {quantity}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => updateCartItemQuantity(id, quantity + 1)}
            className='h-7 w-7 p-0'>
            <IconPlus className='h-3 w-3' />
          </Button>
        </div>
      </div>
      {/* <button
        onClick={() => removeFromCart(id)}
        className='hover:bg-muted-foreground/10 text-muted-foreground/50 hover:text-primary absolute right-4 top-4 cursor-pointer rounded-full p-1 transition ease-in'>
        <IconTrash className='size-3.5' />
      </button> */}
    </div>
  )
}
