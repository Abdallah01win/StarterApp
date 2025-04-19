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
    accessorKey: 'role',
    header: () =>
      h(FilterableHeader, {
        colName: 'role',
        options: userStore.getUserRoleOptions
      }),
    cell: ({ row }) => {
      const role = Number(row.getValue('role'))
      const val = () => userStore.getUserRole(role)

      return h(Badge, { variant: 'outline' }, val)
    }
  }
]

export default columns
