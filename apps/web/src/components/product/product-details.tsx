import type {
  Product,
  ProductReviews,
  ReviewProductOutput,
} from '@ordones/codegen/generated'
import { Button } from '@ordones/ui/components/button'
import { Label } from '@ordones/ui/components/label'
import { Progress } from '@ordones/ui/components/progress'
import { Separator } from '@ordones/ui/components/separator'
import { IconHeart, IconHeartFilled, IconStarFilled } from '@tabler/icons-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { ProductsCarousel } from '@/app/(www)/products/-components/products-carousel'
import { useCartParams } from '@/hooks/use-cart-params.hook'
import { useIsInWishlist } from '@/hooks/use-wishlist.hook'
import { addToWishlist, removeFromWishlist } from '@/store/wishlist-local.store'
import { formatToBRL } from '@/utils/formatters/format-currency.formatter'
import { centsToReal } from '@/utils/helpers/currency.helper'
import { ProductRating } from './product-rating'
import { ProductReview } from './product-review'
import { ProductShippingQuote } from './product-shipping-quote'

export default function ProductDetails({
  product,
  reviews,
  reviewsSummary,
  relatedProducts,
  handleAddToCart,
}: {
  product: Product
  reviews: ReviewProductOutput[]
  reviewsSummary: ProductReviews
  relatedProducts: Product[]
  handleAddToCart: () => void
}) {
  const { setParams } = useCartParams()

  const productImage = product.images?.[0]?.presignedUrl
  const inWishlist = useIsInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()

    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      stock: product.stock,
    }

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(productData as any)
    }
  }

  const handleBuyProduct = () => {
    handleAddToCart()
    setParams({ buyProduct: true })
  }

  const handleAddProductToCart = () => {
    handleAddToCart()
    toast.success('Produto adicionado ao carrinho')
  }

  return (
    <div className='grid h-full w-full grid-cols-12 gap-4'>
      <div className='bg-accent/20 col-span-5 col-start-2 flex h-full w-full flex-col gap-4 rounded-xl border p-6'>
        <div className='bg-muted-foreground/20 aspect-square h-auto w-full overflow-hidden rounded-xl'>
          <img
            src={
              productImage
                ? productImage
                : `https://placehold.co/1200x1200?text=${product.name}`
            }
            alt={product.name}
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      <div className='col-span-5 flex h-full w-full flex-col gap-4 rounded-xl border p-6'>
        <div className='flex w-full flex-col gap-4'>
          <div className='flex w-full items-center justify-between'>
            <Label className='text-lg font-semibold'>{product.name}</Label>
            <Button
              type='button'
              size='icon'
              variant={inWishlist ? 'default' : 'secondary'}
              className='rounded-full'
              onClick={handleWishlistToggle}>
              {inWishlist ? <IconHeartFilled /> : <IconHeart />}
            </Button>
          </div>
          <Label className='text-muted-foreground w-4/5 text-sm font-light'>
            {product.description}
          </Label>
          <div className='flex items-center gap-3'>
            <ProductRating value={4} readOnly />
            <Label className='text-sm font-medium'>42 avaliações</Label>
          </div>
          <div className='my-2 flex items-center'>
            <Label className='text-2xl font-bold'>
              {formatToBRL(centsToReal(product.price))}
            </Label>
          </div>
          <Separator />
          <div className='flex w-full flex-col gap-4'>
            <div className='grid grid-cols-2 gap-2'>
              <Button
                type='button'
                className='w-full'
                variant='secondary'
                onClick={handleAddProductToCart}>
                Adicionar ao carrinho
              </Button>
              <Button
                type='button'
                className='w-full'
                onClick={handleBuyProduct}>
                Comprar agora
              </Button>
            </div>
          </div>
          <ProductShippingQuote productId={product.id} />
        </div>
      </div>
      <div className='col-span-10 col-start-2 flex h-full w-full flex-col gap-8 py-12 pt-10 px-10'>
        <div className='flex flex-col w-full items-center justify-center'>
          <h3>Produtos relacionados</h3>
        </div>
        <ProductsCarousel products={relatedProducts} />
      </div>
      <div className='bg-accent/20 col-span-10 col-start-2 flex h-full w-full flex-col gap-6 rounded-xl border p-6 px-10 py-8'>
        <div className='flex flex-col w-full items-start justify-center col-span-12'>
          <Label className='text-lg font-semibold'>Opiniões do produto</Label>
        </div>
        <div className='grid grid-cols-12 w-full gap-12 '>
          <div className='col-span-2 flex flex-col h-full w-full gap-4'>
            <div className='flex items-center gap-4'>
              <Label className='text-5xl font-bold'>
                {reviewsSummary.averageRating}
              </Label>
              <div className='flex flex-col'>
                <ProductRating value={4} size='md' readOnly />
                <p className='text-muted-foreground'>
                  {reviewsSummary.totalReviews} avaliações
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Progress value={reviewsSummary.ratingCounts.five} />
              <div className='text-muted-foreground flex items-center gap-1'>
                <p className='font-medium text-xs'>5</p>
                <IconStarFilled className='size-3 -mt-[3px]' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Progress value={reviewsSummary.ratingCounts.four} />
              <div className='text-muted-foreground flex items-center gap-1'>
                <p className='font-medium text-xs'>4</p>
                <IconStarFilled className='size-3 -mt-[3px]' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Progress value={reviewsSummary.ratingCounts.three} />
              <div className='text-muted-foreground flex items-center gap-1'>
                <p className='font-medium text-xs'>3</p>
                <IconStarFilled className='size-3 -mt-[3px]' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Progress value={reviewsSummary.ratingCounts.two} />
              <div className='text-muted-foreground flex items-center gap-1'>
                <p className='font-medium text-xs'>2</p>
                <IconStarFilled className='size-3 -mt-[3px]' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Progress value={reviewsSummary.ratingCounts.one} />
              <div className='text-muted-foreground flex items-center gap-1'>
                <p className='font-medium text-xs'>1</p>
                <IconStarFilled className='size-3 -mt-[3px]' />
              </div>
            </div>
          </div>
          <div className='col-span-10 flex h-full w-full flex-col gap-8'>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ProductReview
                  key={index}
                  user={review.createdBy}
                  review={review.comment ?? ''}
                  createdAt={format(review.createdAt, 'dd/MM/yyyy')}
                />
              ))
            ) : (
              <div className='flex flex-col w-full items-center justify-center h-full'>
                <p className='text-muted-foreground/50 -mt-10'>
                  Nenhuma avaliação encontrada
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
