import { cn } from '@ordones/ui/lib/utils'
import type { ReactNode } from 'react'

type Status = {
  id: string
  name: string
  color: string
}

type Feature = {
  id: string
  name: string
  startAt: Date
  endAt: Date
  status: Status
}

export type ListItemsProps = {
  children: ReactNode
  className?: string
}

export const ListItems = ({ children, className }: ListItemsProps) => (
  <div className={cn('flex flex-1 flex-col gap-2 p-3', className)}>
    {children}
  </div>
)

export type ListHeaderProps =
  | {
      children: ReactNode
    }
  | {
      name: Status['name']
      className?: string
    }

export const ListHeader = (props: ListHeaderProps) =>
  'children' in props ? (
    props.children
  ) : (
    <div
      className={cn(
        'bg-foreground/5 flex shrink-0 items-center gap-2 px-6 py-4',
        props.className,
      )}
    >
      <p className="m-0 text-sm font-semibold">{props.name}</p>
    </div>
  )

export type ListGroupProps = {
  id: Status['id']
  children: ReactNode
  className?: string
}

export const ListGroup = ({ children, className }: ListGroupProps) => {
  return (
    <div className={cn('bg-secondary transition-colors', className)}>
      {children}
    </div>
  )
}

export type ListItemProps = Pick<Feature, 'id' | 'name'> & {
  readonly index: number
  readonly parent: string
  readonly children?: ReactNode
  readonly className?: string
}

export const ListItem = ({ name, children, className }: ListItemProps) => {
  return (
    <div className={cn('bg-background/10 flex items-center', className)}>
      {children ?? <p className="m-0 text-sm font-medium">{name}</p>}
    </div>
  )
}

export type ListProviderProps = {
  children: ReactNode
  className?: string
}

export const ListProvider = ({ children, className }: ListProviderProps) => (
  <div className={cn('flex size-full flex-col', className)}>{children}</div>
)
