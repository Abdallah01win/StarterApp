import FilterableHeader from '@/components/table/FilterableHeader.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import { t } from '@/plugins'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/types'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

const userStore = useUserStore()

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: () => h(FilterableHeader, { colName: 'name' })
  },
  {
    accessorKey: 'email',
    header: () => h('div', t('email'))
  },
  {
    accessorKey: 'type',
    header: () =>
      h(FilterableHeader, {
        colName: 'type',
        options: userStore.getUserRoleOptions
      }),
    cell: ({ row }) => {
      const type = Number(row.getValue('type'))
      const val = () => userStore.getUserRole(type)

      return h(Badge, { variant: 'outline' }, val)
    }
  }
]

export default columns
