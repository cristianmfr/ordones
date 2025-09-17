import { Button } from '@ordones/ui/components/button'
import { Calendar } from '@ordones/ui/components/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ordones/ui/components/popover'
import { cn } from '@ordones/ui/lib/utils'
import { IconCalendar } from '@tabler/icons-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Control } from 'react-hook-form'

interface DatePickerFieldProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  isRequired?: boolean
  className?: string
}

export const DatePickerField = ({
  name,
  control,
  label,
  placeholder,
  isRequired = false,
  className,
}: DatePickerFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {isRequired && (
                <strong className='font-semibold text-red-500'>*</strong>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type='button'
                  variant={'outline'}
                  className='group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]'>
                  <span
                    className={cn(
                      'truncate',
                      !field.value && 'text-muted-foreground'
                    )}>
                    {field.value
                      ? format(field.value, 'dd/MM/yyyy')
                      : placeholder}
                  </span>
                  <IconCalendar
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
                  selected={field.value}
                  onSelect={value => {
                    field.onChange(value)
                  }}
                />
              </PopoverContent>
            </Popover>
            {/* <Select
              onValueChange={value => {
                field.onChange(value)
              }}>
              <SelectTrigger
                className='h-9 w-full cursor-pointer'
                aria-invalid={!!fieldState.error}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
