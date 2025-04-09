import type { DateRange, RangeCalendarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export interface CustomCalendarRootProps extends Omit<RangeCalendarRootProps, 'modelValue'> {
  modelValue: DateRange
  size?: 'base' | 'sm'
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  class?: HTMLAttributes['class']
}
