import { Loader2 } from 'lucide-react'
import { cn } from '../lib/utils.js'

export function Loader({
  className,
  size = 4,
}: {
  className?: string
  size?: number
}) {
  return <Loader2 className={cn('animate-spin', className)} size={size} />
}
