import type { Options } from '@/types'
import type { SelectRootProps } from 'reka-ui'

type CustomSelectProps = {
  options: Options<number | string>
  placeholder: string
  size?: 'base' | 'sm'
  isInvalid?: boolean
}

interface CustomSelectRootProps extends Omit<SelectRootProps, 'modelValue'> {
  modelValue?: string | number
}

export type SelectProps = CustomSelectRootProps & CustomSelectProps
