import { Button } from '@ordones/ui/components/button'
import { Label } from '@ordones/ui/components/label'

export function WholesaleSection() {
  return (
    <div className='bg-primary grid h-[550px] w-full grid-cols-2 rounded-lg'>
      <div className='flex h-full w-full items-center justify-between p-6'>
        <div className='bg-muted h-full w-full rounded-xl'></div>
      </div>
      <div className='flex h-full w-full flex-col items-start justify-center gap-4 px-24'>
        <Label className='text-accent text-4xl font-black'>
          Atacado Ordones
        </Label>
        <Label className='text-accent text-md w-2/3'>
          Quer fazer seu pedido em grande quantidade? Nossa equipe está pronta
          para te atender em qualquer lugar do Brasil em um prazo que você vai
          surpreender.
        </Label>
        <Button variant='secondary'>Falar com um consultor</Button>
      </div>
    </div>
  )
}
