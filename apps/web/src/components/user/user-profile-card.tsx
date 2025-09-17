import { Label } from '@ordones/ui/components/label'
import { useNavigate } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

interface UserProfileCardProps {
  icon: LucideIcon
  title: string
  description: string
  link: string
}

export function UserProfileCard({ ...props }: UserProfileCardProps) {
  const navigate = useNavigate()

  return (
    <button
      type='button'
      onClick={() => navigate({ to: props.link })}
      className='cursor-pointer flex flex-col w-full gap-2 bg-card border rounded-lg hover:border-primary/50 transition ease-in p-6'>
      <div className='flex w-full justify-start gap-2'>
        <div className='flex items-center justify-center size-8 bg-primary/8 rounded-full'>
          <props.icon className='text-primary size-4' />
        </div>
        <Label className='text-md font-medium -mb-0.5 cursor-pointer'>
          {props.title}
        </Label>
      </div>
      <div className='flex flex-col w-full justify-between gap-2 items-start h-full'>
        <Label className='text-xs font-light text-muted-foreground cursor-pointer'>
          {props.description}
        </Label>
      </div>
    </button>
  )
}
