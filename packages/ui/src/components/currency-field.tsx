import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import { Input } from '@ordones/ui/components/input'
import { useEffect, useState } from 'react'
import type { Control } from 'react-hook-form'

interface CurrencyFieldProps {
  name: string
  control: Control<any>
  label?: string
  isRequired?: boolean
  className?: string
}

export const CurrencyField = ({
  name,
  control,
  label,
  isRequired = false,
  className,
}: CurrencyFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const [displayValue, setDisplayValue] = useState('')
        const [isFocused, setIsFocused] = useState(false)

        useEffect(() => {
          if (!isFocused && field.value !== undefined) {
            if (field.value === 0) {
              setDisplayValue('')
            } else {
              setDisplayValue(
                new Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(field.value),
              )
            }
          }
        }, [field.value, isFocused])

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value

          let cleanValue = value.replace(/[^\d,]/g, '')

          const commaCount = (cleanValue.match(/,/g) || []).length
          if (commaCount > 1) {
            const commaIndex = cleanValue.indexOf(',')
            cleanValue =
              cleanValue.slice(0, commaIndex + 1) +
              cleanValue.slice(commaIndex + 1).replace(/,/g, '')
          }

          const commaParts = cleanValue.split(',')
          if (
            commaParts.length > 1 &&
            commaParts[1]?.length &&
            commaParts[1].length > 2
          ) {
            cleanValue = commaParts[0] + ',' + commaParts[1].slice(0, 2)
          }

          setDisplayValue(cleanValue)

          const numericValue = cleanValue.replace(',', '.')
          const amount = parseFloat(numericValue) || 0
          field.onChange(amount)
        }

        const handleFocus = () => {
          setIsFocused(true)
          if (field.value > 0) {
            const editableValue = field.value.toString().replace('.', ',')
            setDisplayValue(editableValue)
          }
        }

        const handleBlur = () => {
          setIsFocused(false)
        }

        return (
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
              <div className="grid w-full items-center gap-1.5">
                <div className="relative">
                  <span className="text-muted-foreground absolute inset-y-0 left-0 flex items-center pl-3 text-sm">
                    R$
                  </span>
                  <Input
                    value={displayValue}
                    placeholder="0,00"
                    className="pl-10"
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-invalid={!!fieldState.error}
                  />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
