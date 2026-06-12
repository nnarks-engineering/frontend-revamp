import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import type { NumberFormatOptions } from '@/types/utils-type'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Args) => {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, wait)
  }
}

/** HRBP report dates, e.g. `12-Mar-2026`. */
export function formatDmyMonthDate(isoOrDate: string | Date): string {
  if (typeof isoOrDate === 'string' && !isoOrDate.trim()) return ''
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate
  if (Number.isNaN(d.getTime())) {
    return typeof isoOrDate === 'string' ? isoOrDate : ''
  }
  return format(d, 'dd-MMM-yyyy')
}

export function formatDate(date: Date, addTime?: boolean): string {
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
  if (addTime) {
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })
    return `${dateStr}, ${timeStr}`
  }
  return dateStr
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function trimText(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length)}...` : text
}

export function formatNumber(
  value: number,
  {
    locale = 'en-US',
    style = 'decimal',
    currency,
    unit,
    unitDisplay = 'short',
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }: NumberFormatOptions = {}
): string {
  const opts: Intl.NumberFormatOptions = {
    style,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }
  if (style === 'currency' && currency) opts.currency = currency
  if (style === 'unit' && unit) {
    opts.unit = unit
    opts.unitDisplay = unitDisplay
  }
  return new Intl.NumberFormat(locale, opts).format(value)
}

export function formatAmount(value: number, currency = 'GHS') {
  return formatNumber(value, { style: 'currency', currency })
}

export function getStringColor(str: string): string {
  const colors = [
    'bg-blue-600 text-white',
    'bg-purple-600 text-white',
    'bg-green-600 text-white',
    'bg-orange-600 text-white',
    'bg-pink-600 text-white',
    'bg-indigo-600 text-white',
    'bg-teal-600 text-white',
    'bg-red-600 text-white',
    'bg-cyan-600 text-white',
    'bg-amber-600 text-white',
    'bg-lime-600 text-white',
    'bg-emerald-600 text-white',
    'bg-violet-600 text-white',
    'bg-fuchsia-600 text-white',
    'bg-rose-600 text-white',
    'bg-sky-600 text-white',
  ]

  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.codePointAt(i) ?? 0
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }

  const index = Math.abs(hash) % colors.length
  return colors[index] ?? colors[0] ?? 'bg-gray-600 text-white'
}

export function getColorClass(email: string): string {
  return getStringColor(email)
}

export const validateWithZod = (values: Record<string, unknown>, zodSchema: z.ZodSchema) => {
  try {
    const parsed = zodSchema.parse(values)
    Object.assign(values, parsed)
    return {}
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formikErrors: Record<string, string> = {}

      for (const issue of error.issues) {
        const path = issue.path.join('.')
        formikErrors[path] = issue.message
      }

      return formikErrors
    }
    return {}
  }
}

/**
 * Shared Form Helpers for Common Operations
 */
export const FormHelpers = {
  /**
   * Generic function to preprocess form data based on key handlers
   */
  preprocessFormData: (
    rawData: Record<string, unknown>,
    keyHandlers: Record<string, (value: unknown) => unknown>
  ): Record<string, unknown> => {
    const processedData: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(rawData)) {
      processedData[key] = keyHandlers[key] ? keyHandlers[key](value) : value
    }
    return processedData
  },

  /**
   * Process validation errors from API responses
   */
  processValidationErrors: (details: string[]): Record<string, string> => {
    const errors: Record<string, string> = {}
    for (const detail of details) {
      const [field, message] = detail.split(': ')
      if (field && message) {
        errors[field] = message
      }
    }
    return errors
  },
}
