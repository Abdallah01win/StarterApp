import type { ResponseCodes } from '@/helpers'

export * from './components'
export * from './dashboard'
export * from './user'

export interface Route {
  name: string
  icon: string
  description?: string
  viewPermission?: string
  createPermission?: string
  editPermission?: string
  deletePermission?: string
  printPermission?: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface MetaData {
  current_page: number
  from: number
  to: number
  total: number
  links: []
  path: string
  per_page: number
}

export type Options<T> = { label: string; value: T; disabled?: boolean }[]

export type ToasterOption = {
  code: ResponseCodes
  type: 'success' | 'error'
  title: string
  description?: string
}

export type FilterableHeaderProps = {
  colName: string
  header?: string
  type?: 'string' | 'combobox'
  options?: Options<string | number | null>
}
