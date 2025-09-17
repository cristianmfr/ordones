import { Skeleton } from '@ordones/ui/components/skeleton'

export function CategorySkeleton() {
  return (
    <div className='bg-card/30 flex w-full flex-col rounded-lg border p-6 animate-pulse'>
      <Skeleton className='rounded-lg w-full h-full' />
    </div>
  )
}
