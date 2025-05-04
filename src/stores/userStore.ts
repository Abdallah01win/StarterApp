import { t } from '@/plugins'
import type { User, UserList, userRoleOptions } from '@/types'
import { UserRoles } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAuthStore } from './authStore'
import { construct } from './baseStore'

const endpoint = 'users'

export const useUserStore = defineStore(endpoint, () => {
  const authStore = useAuthStore()

  const users = ref<User[]>([])
  const usersList = ref<UserList[]>([])

  const constructOptions = { endpoint, tableData: users, listData: usersList }

  const userRole: userRoleOptions = [
    { label: t('super-admin'), value: 0 },
    { label: t('admin'), value: 1 },
    { label: t('user'), value: 2 }
  ]

  const getUserRoleOptions = computed(() => {
    return userRole.filter(({ value }) => value > (authStore.user?.role || UserRoles.SUPERADMIN))
  })

  const { fetch, create, update, destroy } = construct(constructOptions)

  const getUserRole = (type: UserRoles) => userRole.find(({ value }) => value === type)?.label

  return {
    users,
    userRole,
    getUserRoleOptions,
    fetch,
    create,
    update,
    destroy,
    getUserRole
  }
})
