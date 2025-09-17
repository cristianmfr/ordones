import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import MultipleSelector from '@ordones/ui/components/multiselect'
import type { Control } from 'react-hook-form'

export type SelectFieldItem = {
  label: string
  value: string
}

interface MultiSelectFieldProps {
  items: SelectFieldItem[]
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  isRequired?: boolean
  className?: string
  isLoading?: boolean
}

export const MultiSelectField = ({
  items,
  name,
  control,
  label,
  placeholder,
  isRequired = false,
  className,
  isLoading = false,
}: MultiSelectFieldProps) => {
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
            <MultipleSelector
              commandProps={{
                label: placeholder || 'Selecione',
              }}
              value={
                field.value?.map((itemId: string) => ({
                  label:
                    items.find((opt) => opt.value === itemId)?.label || itemId,
                  value: itemId,
                })) || []
              }
              onChange={(selectedItems) => {
                const transformedValues = selectedItems.map(
                  (item) => item.value,
                )
                field.onChange(transformedValues)
              }}
              defaultOptions={items}
              options={items}
              placeholder={placeholder || 'Selecione'}
              hideClearAllButton
              hidePlaceholderWhenSelected
              loadingIndicator={
                isLoading ? (
                  <p className="text-center text-sm">Carregando...</p>
                ) : undefined
              }
              emptyIndicator={
                <p className="text-center text-sm">
                  Nenhum resultado encontrado
                </p>
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
