import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import { cn } from '@ordones/ui/lib/utils'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import type { Control } from 'react-hook-form'

interface AmountFieldProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  isRequired?: boolean
  className?: string
}

export const AmountField = ({
  name,
  control,
  label,
  placeholder,
  isRequired = false,
  className,
}: AmountFieldProps) => {
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
          <FormControl className="w-full">
            <div
              className={cn(
                'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-10 w-full min-w-0 overflow-hidden rounded-md border bg-transparent text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              )}
            >
              <div className="grid w-full grid-cols-5 items-center">
                <button
                  type="button"
                  className="border-input hover:bg-input/20 flex h-full w-full cursor-pointer items-center justify-center border-r"
                  onClick={() =>
                    field.onChange(Math.max(0, (Number(field.value) || 0) - 1))
                  }
                >
                  <IconMinus className="text-muted-foreground size-4" />
                </button>
                <input
                  type="number"
                  placeholder={placeholder || 'Type here...'}
                  className="col-span-3 h-full w-full text-center outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  {...field}
                />
                <button
                  type="button"
                  className="border-input hover:bg-input/20 flex h-full w-full cursor-pointer items-center justify-center border-l"
                  onClick={() => field.onChange((Number(field.value) || 0) + 1)}
                >
                  <IconPlus className="text-muted-foreground size-4" />
                </button>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
