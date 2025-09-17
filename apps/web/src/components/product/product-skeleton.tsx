import { Skeleton } from '@ordones/ui/components/skeleton'

export function ProductSkeleton() {
  return (
    <div className='flex flex-col w-full p-3 items-center justify-center rounded-lg bg-muted/30 animate-pulse'>
      <Skeleton className='w-full aspect-square rounded-lg' />
      <Skeleton className='w-full h-10 rounded-lg' />
      <Skeleton className='w-full h-10 rounded-lg' />
    </div>
  )
}
