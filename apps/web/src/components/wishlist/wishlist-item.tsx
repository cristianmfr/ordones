import { Label } from '@ordones/ui/components/label'
import { IconTrash } from '@tabler/icons-react'
import { removeFromWishlist } from '@/store/wishlist-local.store'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'

export function WishlistItem({
  id,
  name,
  price,
  image,
}: {
  id: string
  name: string
  price: number
  image?: string
}) {
  return (
    <div className='bg-card/30 hover:border-primary relative flex w-full items-center gap-4 rounded-lg border p-4 transition ease-in'>
      <div className='size-18 aspect-square overflow-hidden rounded-lg'>
        <img
          src={image ? image : `https://placehold.co/1200x1200?text=${name}`}
          alt={name}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <Label className='font-medium'>{name}</Label>
        <Label className='text-primary text-lg font-bold'>
          {formatToBRL(price)}
        </Label>
      </div>
      <button
        onClick={() => removeFromWishlist(id)}
        className='hover:bg-muted-foreground/10 text-muted-foreground/50 hover:text-primary absolute right-4 top-4 cursor-pointer rounded-full p-1 transition ease-in'>
        <IconTrash className='size-3.5' />
      </button>
    </div>
  )
}
