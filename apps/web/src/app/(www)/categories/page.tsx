import {
  Page,
  PageBreadcrumbs,
  PageContent,
  PageHead,
} from '@ordones/ui/components/page'
import { createFileRoute } from '@tanstack/react-router'
import { CategoriesGrid } from './-components/categories-grid'

export const Route = createFileRoute('/(www)/categories/')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const breadcrumbs = [
    {
      label: 'Início',
      path: '/',
    },
    {
      label: 'Categorias',
      path: '/categories',
    },
  ]

  return (
    <Page>
      <PageContent>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className='grid w-full grid-cols-2'>
          <PageHead
            title='Categorias'
            subtitle='Todas as categorias da nossa loja'
          />
        </div>
        <CategoriesGrid />
      </PageContent>
    </Page>
  )
}
