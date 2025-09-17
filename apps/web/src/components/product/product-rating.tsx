import { Rating, RatingButton } from '@ordones/ui/components/rating'
import { cn } from '@ordones/ui/lib/utils'
import { StarIcon } from 'lucide-react'

export function ProductRating({
  value,
  defaultValue,
  readOnly = false,
  size = 'sm',
}: {
  value?: number
  defaultValue?: number
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <Rating value={value} defaultValue={defaultValue} readOnly={readOnly}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton
          key={index}
          className={cn(
            'text-yellow-500',
            size === 'sm' && '[&_svg]:size-4',
            size === 'md' && '[&_svg]:size-5',
            size === 'lg' && '[&_svg]:size-7'
          )}>
          <StarIcon />
        </RatingButton>
      ))}
    </Rating>
  )
}
