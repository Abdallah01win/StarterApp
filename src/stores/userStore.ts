import { axios, t } from '@/plugins'
import { type User, UserRoles, type userRoleOptions } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAuthStore } from './authStore'
import { baseCreate, baseDestroy, baseUpdate } from './baseStore'
import { useParamStore } from './paramStore'

const endpoint = 'users'

export const useUserStore = defineStore(endpoint, () => {
  const authStore = useAuthStore()
  const paramStore = useParamStore()

  const users = ref<User[]>([])

  const userRole: userRoleOptions = [
    { label: t('super-admin'), value: 0 },
    { label: t('admin'), value: 1 },
    { label: t('user'), value: 2 }
  ]

  const getUserRoleOptions = computed(() => {
    return userRole.filter(({ value }) => value > (authStore.user?.role || UserRoles.SUPERADMIN))
  })

  const fetch = () => {
    const params = paramStore.getParams()

    return new Promise((resolve, reject) => {
      axios.get(endpoint, { params }).then(
        ({ data }) => {
          users.value = data.data
          paramStore.meta = data.meta

          resolve(true)
        },
        () => reject(null)
      )
    })
  }

  const create = baseCreate(endpoint)
  const update = baseUpdate(endpoint)
  const destroy = baseDestroy(endpoint)

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
