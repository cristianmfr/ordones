import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import { cn } from '@ordones/ui/lib/utils'
import { useEffect, useState } from 'react'
import type { Control, UseFormWatch } from 'react-hook-form'

interface DiscountFieldProps {
  name: string
  control: Control<any>
  label?: string
  isRequired?: boolean
  className?: string
  priceFieldName?: string
  watch?: UseFormWatch<any>
  defaultValue?: number
}

export const DiscountField = ({
  name,
  control,
  label,
  isRequired = false,
  className,
  priceFieldName = 'price',
  watch,
  defaultValue = 0,
}: DiscountFieldProps) => {
  const [_, setPercentageValue] = useState<number>(0)

  const price = watch ? watch(priceFieldName) || 0 : 0

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const currentPercentage = field.value || 0
        const currentAmount = (price * currentPercentage) / 100

        const handlePercentageChange = (
          e: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const value = parseFloat(e.target.value) || 0
          const clampedValue = Math.min(100, Math.max(0, value))
          setPercentageValue(clampedValue)

          // Salvar a porcentagem diretamente em vez do valor calculado
          field.onChange(clampedValue)
        }

        const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = parseFloat(e.target.value) || 0
          const clampedValue = Math.min(price, Math.max(0, value))

          // Calcular a porcentagem baseada no valor inserido
          const calculatedPercentage =
            price > 0 ? (clampedValue / price) * 100 : 0

          // Salvar a porcentagem em vez do valor
          field.onChange(calculatedPercentage)
          setPercentageValue(calculatedPercentage)
        }

        useEffect(() => {
          // Inicializar com o valor padrão ou valor atual do formulário
          if (defaultValue > 0) {
            setPercentageValue(defaultValue)
          } else if (currentPercentage > 0) {
            setPercentageValue(currentPercentage)
          }
        }, [defaultValue, currentPercentage])

        const formatCurrency = (value: number) => {
          return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value)
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
            <FormControl className="w-full">
              <div
                className={cn(
                  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-10 w-full min-w-0 overflow-hidden rounded-md border bg-transparent text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                  'focus-visible-within:border-ring focus-visible-within:ring-ring/50 focus-visible-within:ring-[3px]',
                  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                )}
              >
                <div className="grid w-full grid-cols-3 items-center">
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="flex w-full items-center justify-center gap-2">
                      <span className="text-muted-foreground select-none text-[13.5px]">
                        %
                      </span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="0"
                        value={
                          currentPercentage > 0
                            ? currentPercentage.toFixed(2)
                            : ''
                        }
                        aria-invalid={!!fieldState.error}
                        className="h-full outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        onChange={handlePercentageChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center border-l">
                    <div className="flex w-full items-center justify-center gap-2">
                      <span className="text-muted-foreground flex select-none items-center text-sm">
                        R$
                      </span>
                      <input
                        type="number"
                        min="0"
                        max={price}
                        step="0.01"
                        value={currentAmount ? currentAmount.toFixed(2) : ''}
                        placeholder="0,00"
                        aria-invalid={!!fieldState.error}
                        className="h-full outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        onChange={handleAmountChange}
                      />
                    </div>
                  </div>
                  <div className="relative col-span-1 flex w-full items-center justify-center border-l">
                    <div className="flex w-full items-center justify-center gap-2">
                      <span className="text-muted-foreground flex select-none items-center text-sm">
                        R$
                      </span>
                      <span className="text-muted-foreground">
                        {formatCurrency(price - currentAmount)}
                      </span>
                    </div>
                  </div>
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
