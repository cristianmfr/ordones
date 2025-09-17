import type { Product } from '@ordones/codegen/generated'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ordones/ui/components/carousel'
import { ProductRelatedCard } from '@/components/product/product-related-card'

export function ProductsCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className='basis-1/4'>
            <ProductRelatedCard key={index} product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
