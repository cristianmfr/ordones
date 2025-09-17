import {
  Page,
  PageBreadcrumbs,
  PageContent,
  PageHead,
} from '@ordones/ui/components/page'
import { createFileRoute } from '@tanstack/react-router'
import { PageOrderSelect } from '@/components/page-order-select'
import { ProductsGrid } from './-components/products-grid'

export const Route = createFileRoute('/(www)/products/')({
  component: ProductsPage,
  head: () => ({
    meta: [
      {
        title: 'Produtos | Ordones',
      },
    ],
  }),
})

function ProductsPage() {
  const breadcrumbs = [
    {
      label: 'Início',
      path: '/',
    },
    {
      label: 'Produtos',
      path: '/products',
    },
  ]

  return (
    <Page>
      <PageContent>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className='grid w-full grid-cols-2'>
          <PageHead
            title='Produtos'
            subtitle='Todos os produtos da nossa loja'
          />
          <div className='flex items-end justify-end'>
            <PageOrderSelect />
          </div>
        </div>
        <ProductsGrid />
      </PageContent>
    </Page>
  )
}
