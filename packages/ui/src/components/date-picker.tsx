'use client'

import { Button } from '@ordones/ui/components/button'
import { Calendar } from '@ordones/ui/components/calendar'
import { Label } from '@ordones/ui/components/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ordones/ui/components/popover'
import { cn } from '@ordones/ui/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

export function DatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div>
      <div className='*:not-first:mt-2'>
        <Label>Date picker</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className='group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]'>
              <span
                className={cn('truncate', !date && 'text-muted-foreground')}>
                {date ? format(date, 'dd/MM/yyyy') : 'Pick a date'}
              </span>
              <CalendarIcon
                size={16}
                className='text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors'
                aria-hidden='true'
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-2' align='start'>
            <Calendar
              mode='single'
              captionLayout='dropdown-years'
              locale={ptBR}
              selected={date}
              onSelect={setDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
