import { axios } from '@/plugins'
import type { Notification } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const endpoint = 'notifications'

export const useNotificationStore = defineStore(endpoint, () => {
  const notifications = ref<Notification[]>([])
  // const page = ref<number>(1)

  // const params = (page: string) => {
  //   const params = new URLSearchParams()
  //   return params.append('page', page)
  // }

  const getNotificationsCount = computed(() => notifications.value?.length)

  const fetch = () => {
    return new Promise((resolve, reject) => {
      axios.get(endpoint).then(
        ({ data }) => {
          notifications.value = data

          resolve(true)
        },
        () => reject(null)
      )
    })
  }

  const markAsRead = (id: number) => {
    return new Promise((resolve, reject) => {
      axios.post(`notifications/markAsRead`, { id }).then(
        () => {
          notifications.value = notifications.value?.filter((not) => not.id !== id)

          resolve(true)
        },
        () => reject()
      )
    })
  }

  return { notifications, getNotificationsCount, fetch, markAsRead }
})
