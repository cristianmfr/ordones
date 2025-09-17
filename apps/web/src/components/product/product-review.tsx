import { Label } from '@ordones/ui/components/label'
import { HeartIcon } from 'lucide-react'
import { ProductRating } from './product-rating'

export function ProductReview({
  user,
  createdAt,
  review,
}: {
  user: string
  createdAt: string
  review: string
}) {
  return (
    <div className='flex flex-col w-full gap-2.5 rounded-lg bg-muted-foreground/5 p-6'>
      <div className='flex justify-between items-end gap-2'>
        <Label className='text-medium text-sm'>{user}</Label>
        <p className='text-muted-foreground text-xs'>{createdAt}</p>
      </div>
      <span className='text-md font-light w-full'>{review}</span>
      <div className='flex items-center justify-between w-full'>
        <ProductRating value={4} size='sm' readOnly />
        <button
          type='button'
          className='cursor-pointer text-muted-foreground/80 hover:text-muted-foreground transition ease-in'>
          <HeartIcon className='size-4' />
        </button>
      </div>
    </div>
  )
}
