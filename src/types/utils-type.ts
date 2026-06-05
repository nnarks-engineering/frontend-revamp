export type NumberFormatOptions = {
  locale?: string
  style?: Intl.NumberFormatOptions['style']
  currency?: string
  unit?: string
  unitDisplay?: Intl.NumberFormatOptions['unitDisplay']
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  useGrouping?: boolean
}

export interface ApiResponse<T> {
  message: string
  code: number
  data: T
  subCode: string
  errors: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
