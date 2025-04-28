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
import { DateFormats, formatDate, hasPermission } from '@/helpers'
import { cn, valueUpdater } from '@/lib/utils'
import { t } from '@/plugins'
import { routeInfo } from '@/router'
import type { TableCompEmits, TableCompProps } from '@/types'
import type { ColumnDef, ExpandedState } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, getExpandedRowModel, useVueTable } from '@tanstack/vue-table'
import { ChevronRight, Loader2 } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'

import ChildTable from './ChildTable.vue'
import SortableHeader from './SortableHeader.vue'
import TableActions from './TableActions.vue'

const props = defineProps<TableCompProps<TData, TValue, TChildData, TChildValue>>()

const emit = defineEmits<TableCompEmits<TData>>()

const expanded = ref<ExpandedState>({})

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
        }),
      enableSorting: false,
      enableHiding: false
    }

    const expandCol: ColumnDef<TData, TValue> = {
      accessorKey: 'expand',
      enableSorting: false,
      enableHiding: false,
      header: () => h('div'),
      cell: ({ row }) =>
        h(ChevronRight, {
          onClick: () => row.toggleExpanded(),
          class: cn(
            'h-5 w-5 cursor-pointer transition-transform',
            row.getIsExpanded() && 'rotate-90'
          ),
          ariaLabel: t('expand-row')
        })
    }

    const indexCol: ColumnDef<TData, TValue> = {
      accessorKey: 'index',
      header: () => h('div'),
      cell: ({ row }) => h('div', row.index + 1)
    }

    const createdAtCol: ColumnDef<TData, TValue> = {
      accessorKey: 'createdAt',
      header: () => h(SortableHeader, { colName: 'created_at', header: 'created-at' }),
      cell: ({ cell }) => h('div', formatDate(cell.renderValue(), DateFormats.DISPLAY)),
      enableSorting: true
    }

    const actionCol: ColumnDef<TData, TValue> = {
      accessorKey: 'actions',
      enableHiding: false,
      header: () => h('div', { class: 'grid place-content-center' }, t('actions')),
      cell: ({ row }) => {
        const data = row.original
        return h(
          'div',
          { class: 'grid place-content-center relative' },
          h(TableActions, {
            row: data,
            onEdit: (e) => emit('edit', e),
            onDelete: (e) => emit('delete', e)
          })
        )
      }
    }

    const cols: ColumnDef<TData, TValue>[] = [indexCol, ...props.columns]

    const hasActionPermissions =
      hasPermission(routeInfo.value?.editPermission) ||
      hasPermission(routeInfo.value?.deletePermission)

    if (props.isSelectable) cols.unshift(selectCol)
    if (props.isExpandable) cols.unshift(expandCol)
    if (props.hasCreatedAt) cols.push(createdAtCol)
    if (hasActionPermissions) cols.push(actionCol)

    return cols
  },
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get expanded() {
      return expanded.value
    }
  }
})

const columnsLength = computed(() => table.getAllColumns().length)
</script>

<template>
  <ScrollArea class="h-[var(--table-height)] whitespace-nowrap">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id" class="h-10 py-0">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
              @refresh="emit('refresh')"
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
            <TableRow class="bg-muted/50 w-full">
              <TableCell
                v-if="childCols && childDataKey && row.getIsExpanded()"
                :colspan="row.getAllCells().length"
                class="p-0"
              >
                <ChildTable
                  :columns="childCols"
                  :data="row.original[childDataKey] as TChildData[]"
                />
              </TableCell>
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
