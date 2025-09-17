import { Skeleton } from '@ordones/ui/components/skeleton'

export function ProductDetailsSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-4 w-full aspect-video'>
      <div className='flex flex-col w-full aspect-square p-8 rounded-lg bg-muted-foreground/5 animate-pulse'>
        <Skeleton className='w-full h-full rounded-lg' />
      </div>
      <div className='flex flex-col gap-4 w-full aspect-square p-8 rounded-lg bg-muted-foreground/5 animate-pulse'>
        <Skeleton className='w-full h-10 rounded-lg' />
        <Skeleton className='w-1/2 h-10 rounded-lg' />
      </div>
    </div>
  )
}
