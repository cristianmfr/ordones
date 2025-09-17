import { Badge } from '@ordones/ui/components/badge'
import { IconCircleFilled } from '@tabler/icons-react'
import { cn } from '../lib/utils.js'

export function StatusBadge({
  status,
  className,
}: {
  status: boolean
  className?: string
}) {
  return (
    <Badge
      variant={status ? 'active' : 'inactive'}
      className={cn(className, 'select-none')}>
      <IconCircleFilled className='size-1.5 animate-pulse' />
      <span className='font-mono text-[11px] uppercase'>
        {status ? 'Active' : 'Inactive'}
      </span>
    </Badge>
  )
}
