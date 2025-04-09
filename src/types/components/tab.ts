import type { TableCompEmits } from './table'

export type TabCompEmits<T extends { id: number }> = Omit<TableCompEmits<T>, 'delete'> & {
  toggleDialog: [value: void]
}
