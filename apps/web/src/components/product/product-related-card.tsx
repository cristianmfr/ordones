import { Badge } from '@ordones/ui/components/badge'
import { Card, CardContent } from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { cn } from '@ordones/ui/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'
import {
  calculateInstallmentsValues,
  calculateValueByPercentage,
} from '@/utils/helpers/calculate-installments.helper'

interface ProductCardProps {
  product: {
    id: string
    name: string
    percentageSale?: number
    price: number
    installments?: number
    image?: string
  }
}

export function ProductRelatedCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const { id, name, percentageSale, price, installments, image } = product

  const newValue = percentageSale
    ? calculateValueByPercentage(price, percentageSale)
    : price

  const installmentsValues =
    installments && calculateInstallmentsValues(price, installments)

  return (
    <Card
      className='hover:border-primary/30 transition ease-in cursor-pointer'
      onClick={() =>
        navigate({
          to: '/products/$productId',
          params: { productId: id },
        })
      }>
      <CardContent>
        <div className='flex w-full flex-col gap-4'>
          <div className='h-[250px] w-full cursor-pointer overflow-hidden rounded-lg bg-white/10'>
            <img
              src={
                image ? image : `https://placehold.co/1200x1200?text=${name}`
              }
              alt={name}
              className='h-full w-full object-cover'
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex w-full items-center gap-2'>
              <Label
                className={cn(
                  !percentageSale && '-mb-1',
                  'text-md font-semibold'
                )}>
                {name}
              </Label>
              {percentageSale !== undefined && percentageSale > 0 && (
                <Badge variant='outline'>
                  <span className='font-semibold'>
                    {percentageSale.toString()}% OFF
                  </span>
                </Badge>
              )}
            </div>
            <div className='flex w-full flex-col'>
              {percentageSale !== undefined && percentageSale > 0 && (
                <Label className='text-xs font-normal line-through'>
                  {formatToBRL(price)}
                </Label>
              )}
              <Label className='text-2xl font-bold'>
                {formatToBRL(newValue)}
              </Label>
              {percentageSale !== undefined && percentageSale > 1 && (
                <Label className='text-muted-foreground text-sm font-medium'>
                  Em até {installments}x de {formatToBRL(installmentsValues)}
                </Label>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
