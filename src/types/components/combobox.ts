import type { Options } from '@/types'

export type ComboboxProps = {
  options: Options<number | string | null>
  placeholder: string
  disabled?: boolean
  size?: 'base' | 'sm'
  modelValue?: string | number | null
  hasSearch?: boolean
  multiple?: boolean
}
