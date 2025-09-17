import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import { Input } from '@ordones/ui/components/input'
import type { Control } from 'react-hook-form'

interface TextFieldProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  isRequired?: boolean
  className?: string
  unit?: 'cm' | 'mm' | 'm' | 'pol'
}

export const MeasureField = ({
  name,
  control,
  label,
  placeholder,
  isRequired = false,
  className,
  unit = 'cm',
}: TextFieldProps) => {
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
                <strong className="font-semibold text-red-500">*</strong>
              )}
            </FormLabel>
          )}
          <FormControl>
            <div className="*:not-first:mt-2">
              <div className="relative">
                <Input
                  className="peer pe-12 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  placeholder={placeholder || 'Digite aqui...'}
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === '' ? '' : Number(e.target.value)
                    field.onChange(value)
                  }}
                />
                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                  {unit}
                </span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
