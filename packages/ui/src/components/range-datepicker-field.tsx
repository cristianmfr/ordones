import { Button } from '@ordones/ui/components/button'
import { Calendar } from '@ordones/ui/components/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ordones/ui/components/popover'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { type DateRange } from 'react-day-picker'

export function RangeDatepickerField() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  return (
    <div className="flex flex-col gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            id="dates"
            className="w-56 justify-between font-light"
          >
            {range?.from && range?.to
              ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
              : 'Selecione um período'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            captionLayout="dropdown"
            onSelect={(range) => {
              setRange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
