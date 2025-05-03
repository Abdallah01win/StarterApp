import { axios } from '@/plugins'
import type { Notification } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])

  const getNotificationsCount = computed(() => notifications.value?.length)

  const setNotifications = (nots: Notification[]) => (notifications.value = nots)

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

  return { notifications, getNotificationsCount, setNotifications, markAsRead }
})
