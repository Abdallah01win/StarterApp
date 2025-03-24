<script setup lang="ts">
import { BroadcastChannels, BroadcastEvents } from '@/helpers'
import { getEchoInstance } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'

import NotificationDropDown from './NotificationDropDown.vue'
import ProfileDropDown from './ProfileDropDown.vue'
import SearchCommand from './SearchCommand.vue'
import SettingsDropDown from './SettingsDropDown.vue'

const NotificationsEnabled = import.meta.env.VITE_NOTIFICATIONS_ENABLED === 'true'

const authStore = useAuthStore()

const echo = getEchoInstance()
echo
  .private(`${BroadcastChannels.NOTIFICATIONS}.${authStore.user?.id}`)
  .listen(BroadcastEvents.GENERAL, (el: Notification) => {
    console.log(el)
  })
  .notifications((notifications) => {
    console.log('notifs', notifications)
  })
</script>

<template>
  <div class="flex items-center border-1 border-b px-4 py-2">
    <SearchCommand />

    <div class="ml-auto flex items-center gap-2">
      <NotificationDropDown v-if="NotificationsEnabled" />
      <SettingsDropDown />
      <ProfileDropDown />
    </div>
  </div>
</template>
