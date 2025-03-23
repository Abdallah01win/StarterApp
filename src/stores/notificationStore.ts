import { axios } from '@/plugins'
import type { Notification } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const endpoint = 'notifications'

export const useNotificationStore = defineStore(endpoint, () => {
  const notifications = ref<Notification[]>([])
  const readNotifications = new Map<Notification['id'], Notification>()

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

  const markAsRead = (ids: Notification['pivot']['id'][]) => {
    filterOutNotifications(ids)

    return new Promise((resolve, reject) => {
      axios.post(`notifications/mark_as_read`, { ids }).then(
        () => {
          readNotifications.clear()
          resolve(true)
        },
        () => {
          notifications.value = [
            ...notifications.value,
            ...Array.from(readNotifications.values())
          ].sort((a, b) => b.id - a.id)

          reject()
        }
      )
    })
  }

  const filterOutNotifications = (ids: Notification['pivot']['id'][]) => {
    ids.forEach((id) => {
      const not = notifications.value.find((el) => el.id === id)

      if (not) readNotifications.set(id, not)
    })

    notifications.value = notifications.value.filter((el) => !ids.includes(el.id))
  }

  return { notifications, fetch, markAsRead, filterOutNotifications }
})
