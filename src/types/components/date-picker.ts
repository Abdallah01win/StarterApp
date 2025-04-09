import type { CalendarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export type DatePickerCustomProps = CalendarRootProps & {
  disabled?: boolean
  class?: HTMLAttributes['class']
  size?: 'base' | 'sm'
  hasIcon?: boolean
}
