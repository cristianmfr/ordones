'use client'

import { cn } from '@ordones/ui/lib/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        'bg-card/30 text-muted-foreground inline-flex w-fit items-center justify-center gap-1 rounded-lg border p-1',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        '[&_svg]:text-muted-foreground hover:text-muted-foreground data-[state=active]:bg-accent/30 data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 data-[state=active]:shadow-xs inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:-mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0 data-[state=active]:[&_svg]:text-white',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
