import type { ColumnDef } from '@tanstack/vue-table'

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
