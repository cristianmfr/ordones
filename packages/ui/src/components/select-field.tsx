import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ordones/ui/components/select'
import type { Control } from 'react-hook-form'

export type SelectFieldItem = {
  label: string
  value: string
}

interface SelectFieldProps {
  items: SelectFieldItem[]
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'number'
  isRequired?: boolean
  className?: string
}

export const SelectField = ({
  items,
  name,
  control,
  label,
  placeholder,
  isRequired = false,
  className,
}: SelectFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
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
            <Select
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
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
