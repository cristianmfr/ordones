import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import { Input } from '@ordones/ui/components/input'
import type { Control } from 'react-hook-form'
import { withMask } from 'use-mask-input'

interface TextFieldWithMaskProps {
  name: string
  control: Control<any>
  label?: string
  mask: string
  placeholder?: string
  isRequired?: boolean
  isTextarea?: boolean
  className?: string
}

export const TextFieldWithMask = ({
  name,
  control,
  label,
  placeholder,
  mask,
  isRequired = false,
  className,
}: TextFieldWithMaskProps) => {
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
            <Input
              type='text'
              placeholder={placeholder}
              {...field}
              ref={withMask(mask, {
                showMaskOnHover: false,
                removeMaskOnSubmit: true,
                showMaskOnFocus: false,
                jitMasking: true,
                placeholder: '',
              })}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
