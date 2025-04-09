import type { HTMLAttributes } from 'vue'

export type NumberInputProps = {
  defaultValue?: number
  modelValue?: number | string
  min?: number | false
  max?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}
