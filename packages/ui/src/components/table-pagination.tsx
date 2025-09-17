'use client'

import { Badge } from '@ordones/ui/components/badge'
import { PageSizeSelect } from '@ordones/ui/components/page-size-select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ordones/ui/components/pagination'

type TablePaginationProps = {
  total: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function TablePagination({
  total,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, 'ellipsis', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          'ellipsis',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      } else {
        pages.push(
          1,
          'ellipsis',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          'ellipsis',
          totalPages
        )
      }
    }

    return pages
  }

  if (totalPages < 1) return null

  return (
    <div className='grid w-full grid-cols-3'>
      <PageSizeSelect pageSize={pageSize} onPageSizeChange={onPageSizeChange} />
      <div className='flex items-center justify-center'>
        <Badge variant='outline'>
          <span className='text-muted-foreground font-mono text-xs'>
            {currentPage} / {totalPages}
          </span>
        </Badge>
      </div>
      <div className='flex items-center justify-end'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                }
              />
            </PaginationItem>
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}>
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage !== totalPages) {
                    onPageChange(currentPage + 1)
                  }
                }}
                className={
                  currentPage === totalPages
                    ? 'cursor-not-allowed opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
