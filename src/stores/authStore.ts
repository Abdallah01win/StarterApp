import { axios } from '@/plugins'
import router from '@/router'
import type { InitUser, LoginForm, LoginResponse } from '@/types'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useNotificationStore } from './notificationStore'

export const useAuthStore = defineStore('auth', () => {
  const notificationsStore = useNotificationStore()

  const user = ref<InitUser | null>(null)
  const loading = ref(false)

  const login = (form: LoginForm) => {
    return new Promise((_, reject) => {
      axios
        .post<LoginResponse>('login', form)
        .then(({ data }) => {
          Cookies.set('token', data.token)
          router.push('/dashboard')
        })
        .catch(() => reject())
    })
  }

  const initUser = () => {
    return new Promise((resolve, reject) => {
      if (user.value !== null) return resolve(user.value)

      const token = Cookies.get('token')

      if (token) {
        if (router.currentRoute.value.name !== '/') loading.value = true

        axios
          .get<InitUser>('init_user')
          .then(({ data }) => {
            user.value = data
            notificationsStore.setNotifications(data?.notifications)

            resolve(data)
          })
          .catch(() => {
            Cookies.remove('token')

            reject(null)
          })
      } else {
        reject()
      }
    })
  }

  const logout = () => {
    return new Promise((_, reject) => {
      axios.post('logout').then(
        () => {
          user.value = null
          Cookies.remove('token')

          router.push('/')
        },
        () => reject()
      )
    })
  }

  const getUserRole = () => user.value?.role

  const resetLoading = () => (loading.value = false)

  return { user, loading, login, initUser, logout, getUserRole, resetLoading }
})
