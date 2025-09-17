import { useQuery } from '@apollo/client'
import { Pagination } from '@/components/pagination'
import { ProductCard } from '@/components/product/product-card'
import { ProductSkeleton } from '@/components/product/product-skeleton'
import { PRODUCTS_WITH_FILTERS } from '@/graphql/queries/products.queries'
import { useProductsFilters } from '@/hooks/use-product-filters.hook'
import {
  getCurrentPage,
  getSkipFromPage,
} from '@/utils/helpers/pagination.helper'
import { ProductsFilters } from './products-filters'

export function ProductsGrid() {
  const { params, setParams } = useProductsFilters()

  const take = params.take || 10
  const skip = params.skip || 0
  const currentPage = getCurrentPage(skip, take)

  const { data: productsQuery, loading: productsIsLoading } = useQuery(
    PRODUCTS_WITH_FILTERS,
    {
      variables: {
        filters: {
          take,
          skip,
          ...(params.minPrice && { minPrice: params.minPrice }),
          ...(params.maxPrice && { maxPrice: params.maxPrice }),
          ...(params.categories &&
            params.categories.length > 0 && { categories: params.categories }),
          ...(params.tags && params.tags.length > 0 && { tags: params.tags }),
          ...(params.search && { search: params.search }),
          ...(params.order && { order: params.order }),
        },
      },
    }
  )

  const products = productsQuery?.productsWithFilters.items || []
  const productsTotalPages = Math.ceil(
    (productsQuery?.productsWithFilters.total || 0) / take
  )

  const handlePageChange = (page: number) => {
    const newSkip = getSkipFromPage(page, take)
    setParams({ skip: newSkip })
  }

  const handlePageSizeChange = (size: number) => {
    setParams({ take: size, skip: 0 })
  }

  return (
    <div className='grid w-full grid-cols-12 gap-4'>
      <div className='col-span-2 flex w-full flex-col gap-4'>
        <ProductsFilters />
      </div>
      <div className='col-span-10 flex w-full flex-col gap-4'>
        {productsIsLoading ? (
          <div className='grid grid-cols-5 gap-4'>
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-5 gap-4'>
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                value={product.price}
                image={product.images?.[0]?.presignedUrl ?? ''}
                installments={product.installments ?? 1}
                percentageSale={product.discount ?? 0}
              />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={productsTotalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={take}
        />
      </div>
    </div>
  )
}
