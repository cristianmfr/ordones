import { Label } from '@ordones/ui/components/label'
import { Separator } from '@ordones/ui/components/separator'
import { cn } from '@ordones/ui/lib/utils'
import { CreditCard, Phone, ShieldCheck, Truck } from 'lucide-react'

export function DifferentialsBadges() {
  const differentials = [
    {
      icon: Truck,
      text: 'Entrega em todo o território nacional',
    },
    {
      icon: CreditCard,
      text: 'Condições especiais de pagamento',
    },
    {
      icon: Phone,
      text: 'Suporte técnico por telefone',
    },
    {
      icon: ShieldCheck,
      text: 'Garantia contra defeitos de fábrica',
    },
  ]

  return (
    <div className='flex h-[200px] w-full flex-col items-center justify-center'>
      <div className='grid h-12 w-full grid-cols-6'>
        {differentials.map((item, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center justify-center gap-4',
              index === 0 && 'col-start-2'
            )}>
            <div className='bg-primary/5 text-primary flex size-12 items-center justify-center rounded-lg'>
              <item.icon />
            </div>
            <Separator orientation='vertical' />
            <Label className='w-2/3 text-white/90'>{item.text}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
