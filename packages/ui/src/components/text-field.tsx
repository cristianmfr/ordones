import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import { Input } from '@ordones/ui/components/input'
import { Textarea } from '@ordones/ui/components/textarea'
import type { Control } from 'react-hook-form'
import { Skeleton } from './skeleton.js'

interface TextFieldProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'number'
  isRequired?: boolean
  isTextarea?: boolean
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

export const TextField = ({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  isRequired = false,
  isTextarea = false,
  isLoading = false,
  className,
}: TextFieldProps) => {
  if (isLoading) {
    return (
      <div className='flex flex-col w-full gap-2'>
        <Skeleton className='w-24 h-4 rounded-md' />
        <Skeleton className='h-10 rounded-lg' />
      </div>
    )
  }

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
            {isTextarea ? (
              <Textarea
                placeholder={placeholder || 'Digite aqui...'}
                disabled={disabled}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder || 'Digite aqui...'}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
