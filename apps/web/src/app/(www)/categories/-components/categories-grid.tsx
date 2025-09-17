import { useQuery } from '@apollo/client'
import { CategoryCard } from '@/components/category/category-card'
import { CategorySkeleton } from '@/components/category/category-skeleton'
import { CATEGORIES } from '@/graphql/queries/categories.queries'

export function CategoriesGrid() {
  const { data: categoriesQuery, loading: categoriesQueryLoading } = useQuery(
    CATEGORIES,
    {
      variables: {
        query: {
          take: 1000,
          skip: 0,
        },
      },
    }
  )

  const categories = categoriesQuery?.categories.items || []

  if (categories.length <= 0) {
    return (
      <div className='flex flex-col w-full aspect-16/5 rounded-lg bg-muted-foreground/2 items-center justify-center gap-4'>
        <p className='text-muted-foreground select-none'>
          Nenhuma categoria encontrada
        </p>
      </div>
    )
  }

  return (
    <div className='grid w-full grid-cols-6 gap-4'>
      {categoriesQueryLoading ? (
        <div className='grid grid-cols-5 gap-4'>
          {Array.from({ length: 10 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      ) : (
        categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))
      )}
    </div>
  )
}
