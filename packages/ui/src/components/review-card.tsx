import { Label } from '@ordones/ui/components/label'
import { Rating, RatingButton } from '@ordones/ui/components/rating'

export type ReviewCardType = {
  username: string
  rating: number
  message: string
  createdAt: string
}

export function ReviewCard({ ...props }: ReviewCardType) {
  return (
    <div className="bg-card/50 grid h-28 w-full rounded-lg border p-6">
      <div className="grid grid-cols-3">
        <div className="col-span-2 flex w-full items-center">
          <Label className="text-sm font-normal">{props.username}</Label>
        </div>
        <div className="col-span-1 flex w-full items-center justify-end">
          <p className="text-xs font-light">{props.createdAt}</p>
        </div>
      </div>

      <div className="flex w-full flex-nowrap items-center overflow-hidden">
        <span className="text-muted-foreground truncate text-xs">
          {props.message}
        </span>
      </div>

      <Rating value={3} readOnly>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton key={index} size={10} />
        ))}
      </Rating>
    </div>
  )
}
