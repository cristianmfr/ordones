import { Badge } from '@ordones/ui/components/badge'
import { Button } from '@ordones/ui/components/button'
import { Card, CardContent } from '@ordones/ui/components/card'
import { Label } from '@ordones/ui/components/label'
import { cn } from '@ordones/ui/lib/utils'
import { IconHeart, IconHeartPlus } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { useIsInWishlist } from '@/hooks/use-wishlist.hook'
import { addToWishlist, removeFromWishlist } from '@/store/wishlist-local.store'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'
import {
  calculateInstallmentsValues,
  calculateValueByPercentage,
} from '@/utils/helpers/calculate-installments.helper'
import { centsToReal } from '@/utils/helpers/currency.helper'

interface ProductCardProps {
  id: string
  name: string
  percentageSale?: number
  value: number
  installments?: number
  image?: string
  sku?: string
  stock?: number
}

export function ProductCard({
  id,
  name,
  percentageSale,
  value,
  installments,
  image,
  sku = '',
  stock = 0,
}: ProductCardProps) {
  const navigate = useNavigate()

  const realValue = centsToReal(value)
  const newValue = percentageSale
    ? calculateValueByPercentage(realValue, percentageSale)
    : realValue

  const installmentsValues =
    installments && calculateInstallmentsValues(realValue, installments)

  const inWishlist = useIsInWishlist(id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()

    const productData = {
      id,
      name,
      price: realValue,
      sku,
      stock,
      images: image ? [{ presignedUrl: image }] : undefined,
    }

    if (inWishlist) {
      removeFromWishlist(id)
    } else {
      addToWishlist(productData as any)
    }
  }

  return (
    <Card className='hover:border-primary/30 transition ease-in'>
      <CardContent>
        <div
          className='flex w-full flex-col gap-4'
          onClick={() =>
            navigate({
              to: '/products/$productId',
              params: { productId: id },
            })
          }>
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
                  {formatToBRL(realValue)}
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
            <div className='flex w-full items-center gap-2'>
              <div className='w-full'>
                <Button className='w-full'>Comprar</Button>
              </div>
              <Button
                size='icon'
                variant={inWishlist ? 'default' : 'secondary'}
                onClick={handleWishlistToggle}
                className={cn(
                  'transition-colors',
                  inWishlist && 'bg-red-500 text-white hover:bg-red-600'
                )}>
                {inWishlist ? (
                  <IconHeart className='fill-current' />
                ) : (
                  <IconHeartPlus />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
