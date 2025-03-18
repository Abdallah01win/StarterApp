<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { BroadcastChannels, BroadcastEvents, DateFormats, formatDate } from '@/helpers'
import { getEchoInstance, t } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { Bell, Check, Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const echo = getEchoInstance()

const loadingNotifications = ref<number[]>([])

const isLoading = (id: number) => loadingNotifications.value.includes(id)

echo
  .private(`${BroadcastChannels.NOTIFICATIONS}.${authStore.user?.id}`)
  .listen(BroadcastEvents.GENERAL, (el: Notification) => {
    console.log(el)
  })

const markAsRead = (id: number) => {
  loadingNotifications.value.push(id)

  notificationStore.markAsRead(id).finally(() => {
    loadingNotifications.value = loadingNotifications.value.filter((not) => not !== id)
  })
}
</script>

<template>
  <Tooltip>
    <DropdownMenu>
      <TooltipTrigger as-child>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon" class="cursor-pointer">
            <div class="relative">
              <Bell class="size-4" />

              <Badge
                v-if="notificationStore.getNotificationsCount"
                class="absolute -top-2 -right-2.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full p-0 text-[10px]"
              >
                {{ notificationStore.getNotificationsCount }}
              </Badge>
            </div>
            <span class="sr-only">{{ t('notifications') }}</span>
          </Button>
        </DropdownMenuTrigger>
        <TooltipContent>{{ t('notifications') }}</TooltipContent>
      </TooltipTrigger>

      <DropdownMenuContent class="min-w-96">
        <DropdownMenuLabel class="text-center"> {{ t('notifications') }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div v-if="notificationStore.getNotificationsCount">
            <div
              v-for="not in notificationStore.notifications"
              :key="not?.id"
              class="p-1.5 text-sm"
            >
              <div class="flex items-center gap-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  :disabled="isLoading(not.id)"
                  @click="markAsRead(not.id)"
                >
                  <Check v-if="!isLoading(not.id)" class="h-4 w-4" />
                  <Loader2 v-else class="h-4 w-4 animate-spin" />
                </Button>

                <div class="flex flex-col">
                  <div class="mb-0.5">{{ not.data }}</div>
                  <div class="text-muted-foreground text-xs">
                    {{ formatDate(not.createdAt, DateFormats.LONG) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="text-muted-foreground py-3 text-center text-sm">
              {{ t('no-notifications') }}
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Tooltip>
</template>
