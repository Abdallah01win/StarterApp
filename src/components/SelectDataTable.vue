<script setup lang="ts" generic="TData extends { id: number }, TValue, TChildData, TChildValue">
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { valueUpdater } from '@/lib/utils'
import { t } from '@/plugins'
import type { TableCompEmits, TableCompProps } from '@/types'
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { Loader2 } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'

const props = withDefaults(defineProps<TableCompProps<TData, TValue, TChildData, TChildValue>>(), {
  isSelectable: true
})

const emit = defineEmits<TableCompEmits<TData>>()
const rowSelection = ref({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    const selectCol: ColumnDef<TData, TValue> = {
      accessorKey: 'select',
      header: ({ table }) =>
        h(Checkbox, {
          checked: table.getIsAllPageRowsSelected(),
          'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
          ariaLabel: 'Select all'
        }),
      cell: ({ row }) =>
        h(Checkbox, {
          checked: row.getIsSelected(),
          'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
          ariaLabel: 'Select row'
        })
    }

    const indexCol: ColumnDef<TData, TValue> = {
      accessorKey: 'index',
      header: () => h('div'),
      cell: ({ row }) => h('div', row.index + 1)
    }

    const cols: ColumnDef<TData, TValue>[] = [indexCol, ...props.columns]

    if (props.isSelectable) cols.unshift(selectCol)

    return cols
  },
  getCoreRowModel: getCoreRowModel(),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get rowSelection() {
      return rowSelection.value
    }
  }
})

const columnsLength = computed(() => table.getAllColumns().length)
const IsSomeRowsSelected = computed(
  () => table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()
)
const selectedRows = computed(() => table.getSelectedRowModel()?.rows.map((r) => r.original))

defineExpose({ IsSomeRowsSelected, selectedRows })
</script>

<template>
  <ScrollArea class="h-[280px] whitespace-nowrap">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id" class="h-10 py-0">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
              @refresh="header.column.columnDef.enableSorting && emit('refresh')"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <TableRow :data-state="row.getIsSelected() ? 'selected' : undefined">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="py-2.5">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
            <TableRow class="w-full bg-muted/50">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-0" />
            </TableRow>
          </template>
        </template>
        <template v-if="loading || table.getRowModel().rows?.length === 0">
          <TableRow>
            <TableCell v-if="loading" :colspan="columnsLength" class="h-24">
              <div class="flex w-full items-center justify-center">
                <Loader2 v-if="loading" class="h-8 w-8 animate-spin" />
              </div>
            </TableCell>
            <TableCell v-else :colspan="columnsLength" class="h-24 text-center font-medium">
              {{ t('no-results') }}
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>

    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>
