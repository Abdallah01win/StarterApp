import { axios, t } from '@/plugins'
// import { type Notification, NotificationType } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type Notification = any
enum NotificationType {
  TRUCK_NOTIFICATION = 'truck_notification',
  DRIVER_NOTIFICATION = 'driver_notification',
  TRUCK_DRIVER_NOTIFICATION = 'truck_driver_notification',
  TRUCK_DRIVER_NOTIFICATION_2 = 'truck_driver_notification_2'
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])

  const getNotificationsCount = computed(() => notifications.value?.length)

  const setNotifications = (nots: Notification[]) => (notifications.value = nots)

  const markAsRead = (id: string) => {
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

  const formatNotification = (notData: Notification['data']) => {
    if (notData.type === NotificationType.TRUCK_NOTIFICATION) {
      const { truck, date, days_away } = notData

      return t('truck-notification', { date: t(String(date).replace('_', '-')), truck, days_away })
    }
  }

  return { notifications, getNotificationsCount, setNotifications, formatNotification, markAsRead }
})
