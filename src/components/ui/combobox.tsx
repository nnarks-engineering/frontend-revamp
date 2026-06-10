'use client'

import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Avatar } from '../image/Image'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { VisuallyHidden } from './visually-hidden'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { cn } from '@/shared/lib/utils'
import { Label } from './label'

interface SimpleComboboxProps {
  readonly value?: string
  readonly defaultValue?: string
  readonly placeholder?: string
  readonly label?: string
  readonly options: ReadonlyArray<{
    readonly value: string
    readonly label: string
    readonly image?: string
  }>
  readonly disabled?: boolean
  readonly onChange?: (value: string) => void
  readonly onSearchChange?: (search: string) => void
  readonly className?: string
  readonly error?: boolean | string
  readonly name?: string
  readonly noDataText?: string
  readonly required?: boolean
  readonly description?: string
  readonly sortOrder?: 'asc' | 'desc' | 'none'
}

export function Combobox({
  value,
  defaultValue = '',
  placeholder = 'Select option...',
  label,
  options,
  disabled,
  onChange,
  onSearchChange,
  className,
  error,
  name,
  noDataText,
  required,
  description,
  sortOrder = 'asc',
}: SimpleComboboxProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isDesktop = useMediaQuery('(min-width: 528px)')

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value ?? internalValue

  // Handle error prop - can be boolean or string
  const errorMessage =
    typeof error === 'string' ? error : error ? 'This field is required' : undefined
  const hasError = !!error

  // Update internal value when defaultValue changes
  useEffect(() => {
    if (value === undefined) {
      setInternalValue(defaultValue)
    }
  }, [defaultValue, value])

  const handleSelect = (selectedLabel: string): void => {
    const selectedOption = options.find(
      (option) => option.label.toLowerCase() === selectedLabel.toLowerCase()
    )

    if (selectedOption) {
      const newValue = selectedOption.value === currentValue ? '' : selectedOption.value

      if (value === undefined) {
        setInternalValue(newValue)
      }

      onChange?.(newValue)
    }
    setOpen(false)
  }

  const handleOpenChange = (open: boolean): void => {
    setOpen(open)
  }

  const selectedOption = options.find(
    (option) => option.value.toLowerCase() === currentValue?.toLowerCase()
  )
  const inputId = name ? `combobox-${name}` : undefined

  const triggerButton = (
    <Button
      id={inputId}
      disabled={disabled}
      variant="outline"
      aria-expanded={open}
      className={cn(
        'w-full justify-between border border-input! font-normal text-foreground min-h-9 h-auto min-w-48 max-w-full items-start py-2 text-left',
        hasError
          ? 'border-destructive focus-within:border-destructive focus-within:ring-destructive/20'
          : 'border-input focus-within:border-ring',
        className
      )}
    >
      {selectedOption ? (
        <div className="flex items-start gap-2 min-w-0 flex-1">
          {selectedOption.image !== undefined && (
            <Avatar
              alt={selectedOption.label}
              src={selectedOption.image}
              width={24}
              height={24}
              fullName={selectedOption.label}
            />
          )}
          <span className=" whitespace-normal break-words min-w-0">
            {selectedOption.label}
          </span>
        </div>
      ) : currentValue ? (
        <span className="">{currentValue}</span>
      ) : (
        <span>{placeholder}</span>
      )}
      <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  )

  const drawerTitle = label || placeholder || 'Select an option'

  return (
    <div className="space-y-2 w-full">
      {label && (
        <Label
          htmlFor={inputId}
          className=""
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <div className="my-1">
        {isDesktop ? (
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
            <PopoverContent
              className="min-w-[var(--radix-popover-trigger-width)] max-w-[min(100vw-2rem,36rem)] w-max p-0"
              align="start"
            >
              <OptionsList
                options={options}
                value={currentValue}
                onSelect={handleSelect}
                onSearchChange={onSearchChange}
                noDataText={noDataText}
                sortOrder={sortOrder}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Drawer open={open} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
            <DrawerContent className="w-full">
              <VisuallyHidden>
                <DrawerTitle>{drawerTitle}</DrawerTitle>
              </VisuallyHidden>
              <div className="mt-4 border-t w-full">
                <OptionsList
                  options={options}
                  value={currentValue}
                  onSelect={handleSelect}
                  onSearchChange={onSearchChange}
                  noDataText={noDataText}
                  sortOrder={sortOrder}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
      {errorMessage && <div className="text-sm font-medium text-destructive">{errorMessage}</div>}
      {name && <input type="hidden" name={name} value={currentValue} />}
    </div>
  )
}

interface OptionsListProps {
  readonly options: ReadonlyArray<{
    readonly value: string
    readonly label: string
    readonly image?: string
  }>
  readonly value: string
  readonly noDataText?: string
  readonly onSelect: (label: string) => void
  readonly onSearchChange?: (search: string) => void
  readonly sortOrder?: 'asc' | 'desc' | 'none'
}

function OptionsList({
  options,
  value,
  onSelect,
  onSearchChange,
  noDataText,
  sortOrder = 'asc',
}: OptionsListProps) {
  // Sort options based on sortOrder prop
  const sortedOptions =
    sortOrder === 'none'
      ? options
      : [...options].sort((a, b) => {
          const comparison = a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
          return sortOrder === 'desc' ? -comparison : comparison
        })

  return (
    <Command className="w-full">
      <CommandInput placeholder="Search..." onValueChange={onSearchChange} />
      <CommandList
        onWheel={(e) => {
          e.stopPropagation()
        }}
        className="w-full"
      >
        <CommandEmpty>{noDataText || 'No option found.'}</CommandEmpty>
        <CommandGroup>
          {sortedOptions.map((option) => (
            <CommandItem
              key={`${String(option.value)}`}
              value={option.label}
              onSelect={onSelect}
              className="flex items-center gap-2"
            >
              <CheckIcon
                className={cn(
                  'h-4 w-4 shrink-0',
                  value === option.value ? 'opacity-100' : 'opacity-0'
                )}
              />
              {option.image !== undefined && (
                <Avatar
                  alt={option.label}
                  src={option.image}
                  width={32}
                  height={32}
                  fullName={option.label}
                />
              )}
              <span className="flex-1">{option.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
