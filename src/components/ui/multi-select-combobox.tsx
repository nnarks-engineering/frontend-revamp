'use client'


import { CheckIcon, ChevronDownIcon, X } from 'lucide-react'
import { useState } from 'react'


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
import { useMediaQuery } from '@/shared/hooks/core/use-media-query'
import { cn } from '@/shared/lib/utils'

import { Avatar } from '../image/Image'

import { Badge } from './badge'
import { Label } from './label'

interface MultiSelectComboboxProps {
  readonly value?: string[]
  readonly defaultValue?: string[]
  readonly placeholder?: string
  readonly label?: string
  readonly options: ReadonlyArray<{
    readonly value: string
    readonly label: string
    readonly image?: string
  }>
  readonly disabled?: boolean
  readonly onChange?: (value: string[]) => void
  readonly onSearchChange?: (search: string) => void
  readonly className?: string
  readonly error?: boolean | string
  readonly name?: string
  readonly noDataText?: string
  readonly required?: boolean
  readonly description?: string
  readonly maxDisplay?: number
  readonly showSelectedItemsInTrigger?: boolean
}

function TriggerContent({
  selectedValues,
  displayOptions,
  remainingCount,
  placeholder,
  handleRemove,
  showSelectedItemsInTrigger = true,
}: {
  readonly selectedValues: readonly string[]
  readonly displayOptions: readonly { readonly value: string; readonly label: string }[]
  readonly remainingCount: number
  readonly placeholder: string
  readonly handleRemove: (optionValue: string) => void
  readonly showSelectedItemsInTrigger?: boolean
}) {
  if (selectedValues.length === 0 || !showSelectedItemsInTrigger) {
    return <span className="text-muted-foreground">{placeholder}</span>
  }
  return (
    <div className="flex flex-wrap gap-1">
      {displayOptions.map((option) => (
        <Badge key={option.value} variant="secondary" className="text-xs px-2 py-0.5 h-6 text-primary-fg bg-primary-bg border-primary-bg-hover! rounded-sm ">
          {option.label}
          <span
            role="button"
            tabIndex={0}
            className="ml-1 hover:bg-secondary-foreground/20 rounded-md  p-0.5 cursor-pointer inline-flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleRemove(option.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                handleRemove(option.value)
              }
            }}
            aria-label={`Remove ${option.label}`}
          >
            <X className="size-2.5" />
          </span>
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="secondary" className="text-xs px-2 py-0.5 h-6">
          +{remainingCount}
        </Badge>
      )}
    </div>
  )
}

function CommandContent({
  options,
  selectedValues,
  handleSelect,
  onSearchChange,
  noDataText,
}: {
  readonly options: ReadonlyArray<{ value: string; label: string; image?: string }>
  readonly selectedValues: string[]
  readonly handleSelect: (optionValue: string) => void
  readonly onSearchChange?: (search: string) => void
  readonly noDataText: string
}) {
  return (
    <Command>
      <CommandInput placeholder="Search options..." onValueChange={onSearchChange} />
      <CommandList
        onWheel={(e) => {
          e.stopPropagation()
        }}
      >
        <CommandEmpty>{noDataText}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value)
            return (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center justify-center w-4 h-4">
                    {isSelected && <CheckIcon className="h-3 w-3" />}
                  </div>
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
                </div>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function MultiSelectCombobox({
  value = [],
  defaultValue = [],
  placeholder = 'Select options...',
  label,
  options,
  disabled,
  onChange,
  onSearchChange,
  className,
  error,
  name,
  noDataText = 'No options found.',
  required,
  description,
  maxDisplay = 3,
  showSelectedItemsInTrigger = true,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>(value || defaultValue || [])
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (value !== undefined && value !== selectedValues && JSON.stringify(value) !== JSON.stringify(selectedValues)) {
    setSelectedValues(value)
  }

  const handleSelect = (optionValue: string) => {
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue]

    setSelectedValues(newSelectedValues)
    onChange?.(newSelectedValues)
  }

  const handleRemove = (optionValue: string) => {
    const newSelectedValues = selectedValues.filter((v) => v !== optionValue)
    setSelectedValues(newSelectedValues)
    onChange?.(newSelectedValues)
  }

  const selectedOptions = options.filter((option) => selectedValues.includes(option.value))
  const displayOptions = selectedOptions.slice(0, maxDisplay)
  const remainingCount = selectedOptions.length - maxDisplay

  if (!isDesktop) {
    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <Label htmlFor={name} className="">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                'w-full justify-between min-h-9 h-auto',
                error && 'border-destructive',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              disabled={disabled}
              name={name}
            >
              <div className="flex-1 text-left overflow-hidden">
                <TriggerContent
                  showSelectedItemsInTrigger={showSelectedItemsInTrigger}
                  selectedValues={selectedValues}
                  displayOptions={displayOptions}
                  remainingCount={remainingCount}
                  placeholder={placeholder}
                  handleRemove={handleRemove}
                />
              </div>
              <ChevronDownIcon className=" h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle className="sr-only">{label || 'Select options'}</DrawerTitle>
            <div className="mt-4 border-t">
              <CommandContent
                options={options}
                selectedValues={selectedValues}
                handleSelect={handleSelect}
                onSearchChange={onSearchChange}
                noDataText={noDataText}
              />
            </div>
          </DrawerContent>
        </Drawer>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && typeof error === 'string' && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className="">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between min-h-9 py-0 border-border hover: h-auto px-1',
              error && 'border-destructive',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            disabled={disabled}
            name={name}
          >
            <div className="flex-1 text-left overflow-hidden">
              <TriggerContent
                showSelectedItemsInTrigger={showSelectedItemsInTrigger}
                selectedValues={selectedValues}
                displayOptions={displayOptions}
                remainingCount={remainingCount}
                placeholder={placeholder}
                handleRemove={handleRemove}
              />
            </div>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <CommandContent
            options={options}
            selectedValues={selectedValues}
            handleSelect={handleSelect}
            onSearchChange={onSearchChange}
            noDataText={noDataText}
          />
        </PopoverContent>
      </Popover>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && typeof error === 'string' && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
