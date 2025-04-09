import type { ColumnDef } from '@tanstack/vue-table'
import type { CalendarRootProps, DateRange, RangeCalendarRootProps, SelectRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export * from './dashboard'
export * from './user'
export * from './client'

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

type CustomSelectProps = {
  options: Options<number | string>
  placeholder: string
  size?: 'base' | 'sm'
  isInvalid?: boolean
}

export type ComboboxProps = {
  options: Options<number | string>
  placeholder: string
  disabled?: boolean
  size?: 'base' | 'sm'
  modelValue?: string | number
}

interface CustomSelectRootProps extends Omit<SelectRootProps, 'modelValue'> {
  modelValue?: string | number
}

export type SelectProps = CustomSelectRootProps & CustomSelectProps

export interface CustomCalendarRootProps extends Omit<RangeCalendarRootProps, 'modelValue'> {
  modelValue: DateRange
  size?: 'base' | 'sm'
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  class?: HTMLAttributes['class']
}

export type StepperFormProps = {
  formSchema: any[]
  steps: { step: number; title: string; description: string }[]
  loading: boolean
  isEdit: boolean
}

export interface TableCompProps<T, V, CT, CV> {
  columns: ColumnDef<T, V>[]
  data: T[]
  childCols?: ColumnDef<CT, CV>[]
  childDataKey?: keyof T
  isSelectable?: boolean
  isExpandable?: boolean
  isPrintable?: boolean
  hasCreatedAt?: boolean
  loading: boolean
}

export type TableCompEmits<T extends { id: number }> = {
  edit: [row: T]
  print: [row: T]
  delete: [id: T['id']]
  refresh: [value: void]
}

export type TabCompEmits<T extends { id: number }> = Omit<TableCompEmits<T>, 'delete'> & {
  toggleDialog: [value: void]
}

export type NumberInputProps = {
  defaultValue?: number
  modelValue?: number | string
  min?: number | false
  max?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}

export type DatePickerCustomProps = CalendarRootProps & {
  disabled?: boolean
  class?: HTMLAttributes['class']
  size?: 'base' | 'sm'
  hasIcon?: boolean
}
