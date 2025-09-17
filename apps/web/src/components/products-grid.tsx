import { useQuery } from '@apollo/client'
import type { Product } from '@ordones/codegen/types'
import { Pagination } from '@/components/ui/pagination'
import { ProductCard } from '@/components/ui/product-card'
import { ProductsFilters } from '@/components/ui/products-filters'
import { PRODUCTS_WITH_FILTERS } from '@/graphql/queries/products.queries'
import { useProductsFilters } from '@/hooks/use-product-filters.hook'
import {
  getCurrentPage,
  getSkipFromPage,
} from '@/utils/helpers/pagination.helper'

function Products({ products }: { products: Product[] }) {
  return (
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
  )
}

export function ProductsGrid() {
  const { params, setParams } = useProductsFilters()

  const take = params.take || 10
  const skip = params.skip || 0
  const currentPage = getCurrentPage(skip, take)

  const { data } = useQuery(PRODUCTS_WITH_FILTERS, {
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
  })

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
        <Products products={data?.productsWithFilters.items || []} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.productsWithFilters.total || 0) / take)}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={take}
        />
      </div>
    </div>
  )
}
