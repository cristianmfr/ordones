import { Button } from '@ordones/ui/components/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ordones/ui/components/command'
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
import { CheckIcon, ChevronDownIcon, PlusIcon } from 'lucide-react'
import { useId, useState } from 'react'
import type { Control } from 'react-hook-form'

export type SelectWithActionsFieldItem = {
  label: string
  value: string
}

interface SelectWithActionsFieldProps {
  items: SelectWithActionsFieldItem[]
  name: string
  control: Control<any>
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  actionLabel?: string
  onActionClick?: () => void
  isRequired?: boolean
  className?: string
}

export const SelectWithActionsField = ({
  items,
  name,
  control,
  label,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No options found.',
  actionLabel = 'Add new',
  onActionClick,
  isRequired = false,
  className,
}: SelectWithActionsFieldProps) => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel htmlFor={id}>
              {label}
              {isRequired && (
                <strong className="font-semibold text-red-500">*</strong>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild aria-invalid={!!fieldState.error}>
                <Button
                  id={id}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-invalid={!!fieldState.error}
                  className={cn(
                    'bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-none outline-offset-0 focus-visible:outline-[3px]',
                    fieldState.error &&
                      'border-destructive/20 dark:border-destructive',
                  )}
                >
                  <span
                    className={cn(
                      'truncate',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value
                      ? items.find((item) => item.value === field.value)?.label
                      : placeholder}
                  </span>
                  <ChevronDownIcon
                    size={16}
                    className="text-muted-foreground/80 shrink-0"
                    aria-hidden="true"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                align="start"
              >
                <Command>
                  <CommandInput placeholder={searchPlaceholder} />
                  <CommandList>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>
                      {items.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={(currentValue) => {
                            field.onChange(
                              currentValue === field.value ? '' : currentValue,
                            )
                            setOpen(false)
                          }}
                        >
                          {item.label}
                          {field.value === item.value && (
                            <CheckIcon size={16} className="ml-auto" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {onActionClick && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <Button
                            variant="ghost"
                            className="w-full justify-start font-normal"
                            onClick={onActionClick}
                          >
                            <PlusIcon
                              size={16}
                              className="-ms-2 opacity-60"
                              aria-hidden="true"
                            />
                            {actionLabel}
                          </Button>
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
