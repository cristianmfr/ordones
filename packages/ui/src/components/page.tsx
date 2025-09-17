import { cn } from '@ordones/ui/lib/utils'
import { IconChevronRight } from '@tabler/icons-react'
import * as React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from './breadcrumb.js'

function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='page'
      className={cn('w-full h-full min-h-screen', className)}
      {...props}
    />
  )
}

export type PageBreadcrumbItem = { label: string; path: string }

function PageBreadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: PageBreadcrumbItem[]
}) {
  return (
    <div className='col-span-2 flex w-full items-center gap-2'>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem key={index}>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.path}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              )}
              {index < breadcrumbs.length - 1 && (
                <IconChevronRight
                  stroke={2}
                  size={14}
                  className='text-muted-foreground/80 mt-[1px]'
                />
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

function PageHead({
  className,
  title,
  subtitle,
  ...props
}: { title?: string; subtitle?: string } & React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='page-head'
      className={cn(
        'flex h-auto w-full grid-cols-2 flex-col items-end md:grid',
        className
      )}>
      <div className='col-span-1 flex h-full w-full flex-col justify-end'>
        {title && <PageTitle>{title}</PageTitle>}
        {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
      </div>
      <div className='col-span-1 flex h-full w-full items-end justify-end'>
        {props.children}
      </div>
    </div>
  )
}

function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return <h3 data-slot='page-title' className={cn(className)} {...props} />
}

function PageSubtitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot='page-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function PageContent({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot='page-content'
      className={cn(
        'flex flex-col gap-2 space-y-4 px-8 py-6 w-full h-full',
        className
      )}
      {...props}
    />
  )
}

export { Page, PageBreadcrumbs, PageContent, PageHead, PageSubtitle, PageTitle }
