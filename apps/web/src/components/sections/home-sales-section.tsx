import { useQuery } from '@apollo/client'
import { Button } from '@ordones/ui/components/button'
import { Label } from '@ordones/ui/components/label'
import { Link } from '@tanstack/react-router'
import { PRODUCTS } from '@/graphql/queries/products.queries'
import { ProductCard } from '../product/product-card'
import { ProductSkeleton } from '../product/product-skeleton'

export function SalesSection() {
  const { data: productsQuery, loading: productsIsLoading } = useQuery(
    PRODUCTS,
    {
      variables: {
        query: {
          take: 4,
          skip: 0,
        },
      },
    }
  )

  const products = productsQuery?.products.items

  return (
    <div className='mb-2 flex w-full flex-col items-center justify-center gap-6'>
      <Label className='text-lg font-semibold'>Em destaque</Label>
      <div className='grid grid-cols-10 gap-4'>
        {productsIsLoading ? (
          <SalesProductsSkeleton />
        ) : (
          <div className='col-span-8 col-start-2 grid w-full grid-cols-4 gap-4'>
            {products && products?.length > 0 ? (
              products.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  value={product.price}
                  image={product.images?.[0]?.presignedUrl ?? ''}
                  installments={10}
                  percentageSale={80}
                />
              ))
            ) : (
              <div className='flex flex-col items-center justify-center w-full h-32'>
                <p className='text-muted-foreground'>
                  Nenhum produto em promoção encontrado
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Button type='button' asChild>
        <Link to='/products'>Ver todos</Link>
      </Button>
    </div>
  )
}

function SalesProductsSkeleton() {
  return (
    <div className='col-span-8 col-start-2 grid w-full grid-cols-4 gap-4'>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  )
}
