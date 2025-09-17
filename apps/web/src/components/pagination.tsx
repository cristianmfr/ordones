import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@ordones/ui/components/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ordones/ui/components/select'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useId } from 'react'
import { usePagination } from '@/hooks/use-pagination.hook'

type PaginationProps = {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSize?: number
}

export function Pagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  onPageChange,
  onPageSizeChange,
  pageSize = 10,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  })

  return (
    <div className='grid w-full grid-cols-3 gap-4'>
      <div className='col-span-1 flex items-center justify-start gap-4'>
        <Select
          value={pageSize.toString()}
          onValueChange={value => onPageSizeChange?.(Number(value))}>
          <SelectTrigger id={useId()}>
            <SelectValue placeholder='Selecione a quantidade' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
            <SelectItem value='100'>100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex w-full items-center justify-center'>
        <p
          className='text-muted-foreground flex gap-1 pl-2 text-sm'
          aria-live='polite'>
          <span className='text-foreground'>{currentPage}</span> de{' '}
          <span className='text-foreground'>{totalPages}</span>
        </p>
      </div>

      <div className='flex items-center justify-end'>
        <div>
          <PaginationComponent>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange?.(currentPage - 1)}
                  aria-disabled={currentPage === 1 ? true : undefined}>
                  <ChevronLeftIcon size={16} aria-hidden='true' />
                </PaginationLink>
              </PaginationItem>

              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {pages.map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange?.(page)}
                    isActive={page === currentPage}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange?.(currentPage + 1)}
                  aria-disabled={currentPage === totalPages ? true : undefined}>
                  <ChevronRightIcon size={16} aria-hidden='true' />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </PaginationComponent>
        </div>
      </div>
    </div>
  )
}
