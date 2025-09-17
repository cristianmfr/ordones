import { Label } from '@ordones/ui/components/label'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'

export function CartProduct({
  name,
  price,
  image,
}: {
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
      <div className='flex flex-1 flex-col gap-1'>
        <Label className='font-medium'>{name}</Label>
        <Label className='text-primary text-lg font-bold'>
          {formatToBRL(price)}
        </Label>
      </div>
    </div>
  )
}
