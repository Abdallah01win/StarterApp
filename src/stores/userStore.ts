import { axios, t } from '@/plugins'
import { type User, UserTypes, type userTypeOptions } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAuthStore } from './authStore'
import { useParamStore } from './paramStore'

export const useUserStore = defineStore('users', () => {
  const authStore = useAuthStore()
  const paramStore = useParamStore()

  const users = ref<User[]>([])

  const userType: userTypeOptions = [
    { label: t('super-admin'), value: 0 },
    { label: t('admin'), value: 1 },
    { label: t('accountant'), value: 2 }
  ]

  const getUserTypeOptions = computed(() => {
    return userType.filter(({ value }) => value > (authStore.user?.type || UserTypes.SUPERADMIN))
  })

  const fetch = () => {
    const params = paramStore.getParams()

    return new Promise((resolve, reject) => {
      axios.get('users', { params }).then(
        ({ data }) => {
          users.value = data.data
          paramStore.meta = data.meta

          resolve(true)
        },
        () => reject(null)
      )
    })
  }

  const create = (form: any) => {
    return new Promise((resolve, reject) => {
      axios.post(`users`, form).then(
        () => resolve(true),
        () => reject()
      )
    })
  }

  const update = (form: any) => {
    return new Promise((resolve, reject) => {
      axios.put(`users/${form.id}`, form).then(
        () => {
          if (form.id === authStore.user?.id) {
            authStore.logout().then(() => resolve(true))
          }
          resolve(true)
        },
        () => reject()
      )
    })
  }

  const destroy = (id: number) => {
    return new Promise((resolve, reject) => {
      axios.delete(`users/${id}`).then(
        () => resolve(true),
        () => reject()
      )
    })
  }

  const getUserType = (type: UserTypes) => userType.find(({ value }) => value === type)?.label

  return {
    users,
    userType,
    getUserTypeOptions,
    fetch,
    create,
    update,
    destroy,
    getUserType
  }
})
