import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ordones/ui/components/form'
import { Input } from '@ordones/ui/components/input'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useState } from 'react'
import type { Control } from 'react-hook-form'

interface TextFieldProps {
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  isRequired?: boolean
}

export const SecureField = ({
  name,
  control,
  label,
  placeholder,
  isRequired = false,
}: TextFieldProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {isRequired && (
                <strong className="font-semibold text-red-500">*</strong>
              )}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex w-full items-center">
              <Input
                type={isVisible ? 'text' : 'password'}
                placeholder={placeholder || 'Digite aqui...'}
                {...field}
              />
              <button
                type="button"
                className="absolute right-3 cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <IconEyeOff className="text-muted-foreground size-4" />
                ) : (
                  <IconEye className="text-muted-foreground size-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
