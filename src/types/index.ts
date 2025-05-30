import type { ResponseCodes } from '@/helpers'
import type { Ref } from 'vue'

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

export type Notification = {
  readonly id: number
  data: Record<string, string | number>
  createdAt: Date
}

export interface LoginForm {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface MetaData {
  currentPage: number
  from: number
  to: number
  total: number
}

export type Options<T> = { label: string; value: T; disabled?: boolean }[]

export type ToasterOption = {
  code: ResponseCodes
  type: 'success' | 'error'
  title: string
  description?: string
}

export type fetchParams = {
  endpoint: string
  tableData: Ref
  listData?: Ref
}

export type FilterableHeaderProps = {
  colName: string
  header?: string
  type?: 'string' | 'combobox'
  options?: Options<string | number | null>
}
