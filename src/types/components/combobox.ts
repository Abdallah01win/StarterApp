import type { Options } from '@/types'

export type ComboboxProps = {
  options: Options<number | string>
  placeholder: string
  disabled?: boolean
  size?: 'base' | 'sm'
  modelValue?: string | number
  hasSearch?: boolean
  multiple?: boolean
}
