<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BroadcastChannels, BroadcastEvents, DateFormats, formatDate } from '@/helpers'
import { getEchoInstance, t, z } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { toTypedSchema } from '@vee-validate/zod'
import { Bell, Check, Loader2 } from 'lucide-vue-next'
import type { CheckboxRootEmits } from 'reka-ui'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { watch } from 'vue'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const echo = getEchoInstance()

const loading = ref(false)
const selectAll = ref(false)

echo
  .private(`${BroadcastChannels.NOTIFICATIONS}.${authStore.user?.id}`)
  .listen(BroadcastEvents.GENERAL, (el: Notification) => {
    console.log(el)
  })

const validationSchema = toTypedSchema(
  z.object({
    notifications: z.array(z.number())
  })
)

const { values, handleSubmit, resetField, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    notifications: []
  }
})

watch(
  () => values.notifications,
  (selected) => {
    if (selected) {
      const allIds = notificationStore.notifications.map((n) => n.id)
      selectAll.value = selected.length > 0 && allIds.every((id) => selected?.includes(id))
    }
  },
  { deep: true }
)

const fetchNotifications = (e: boolean) => {
  if (e && !notificationStore.notifications.length) {
    loading.value = true

    notificationStore.fetch().finally(() => {
      loading.value = false
    })
  }
}

const toggleSelectAll = (e: CheckboxRootEmits['update:modelValue'][0]) => {
  if (e) {
    const ids = notificationStore.notifications.map((el) => el.id)

    setFieldValue('notifications', ids)
  } else resetField('notifications')
}

const markAsRead = (ids: number | number[]) => {
  ids = !Array.isArray(ids) ? [ids] : ids
  notificationStore.markAsRead(ids)
}

const onSubmit = handleSubmit((values) => {
  markAsRead(values.notifications)
})
</script>

<template>
  <Tooltip>
    <DropdownMenu @update:open="fetchNotifications">
      <TooltipTrigger as-child>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon" class="cursor-pointer">
            <div class="relative">
              <Bell class="size-4" />

              <Badge
                v-if="authStore.user?.notificationsCount"
                class="absolute -top-2 -right-2.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full p-0 text-[10px]"
              >
                {{ notificationStore.notifications.length || authStore.user?.notificationsCount }}
              </Badge>
            </div>
            <span class="sr-only">{{ t('notifications') }}</span>
          </Button>
        </DropdownMenuTrigger>
        <TooltipContent>{{ t('notifications') }}</TooltipContent>
      </TooltipTrigger>

      <DropdownMenuContent class="min-w-96">
        <form @submit="onSubmit">
          <div class="relative flex items-center justify-center px-1.5">
            <div class="absolute top-[50%] left-0 translate-y-[-40%] px-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Checkbox
                      v-if="notificationStore.notifications.length"
                      v-model="selectAll"
                      class="cursor-pointer justify-start"
                      @update:model-value="toggleSelectAll"
                    />
                  </TooltipTrigger>
                  <TooltipContent>{{ t('mark-all-as-read') }}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <DropdownMenuLabel>{{ t('notifications') }}</DropdownMenuLabel>

            <button
              v-if="values.notifications?.length"
              class="text-muted-foreground hover:text-foreground absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer px-1.5 text-xs"
            >
              {{ t('mark-as-read') }}
            </button>
          </div>
          <DropdownMenuSeparator />

          <ScrollArea>
            <DropdownMenuGroup>
              <div v-if="notificationStore.notifications.length" class="max-h-[350px]">
                <FormField name="notifications">
                  <FormItem>
                    <FormField
                      v-for="not in notificationStore.notifications"
                      v-slot="{ value, handleChange }"
                      :key="not.pivot.id"
                      type="checkbox"
                      :value="not.pivot.id"
                      :unchecked-value="false"
                      name="notifications"
                    >
                      <FormItem class="p-1.5 text-sm">
                        <div class="group flex items-center gap-x-3">
                          <FormControl>
                            <Checkbox
                              class="cursor-pointer"
                              :model-value="value.includes(not.pivot.id)"
                              @update:model-value="handleChange"
                            />
                          </FormControl>

                          <div class="flex flex-col">
                            <div class="mb-0.5">{{ not.title }}</div>
                            <div class="text-muted-foreground text-xs">
                              {{ not.message }}
                            </div>
                          </div>

                          <div class="text-muted-foreground ml-auto flex items-center text-xs">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger as-child>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    class="hidden cursor-pointer group-hover:flex"
                                    @click="markAsRead(not.id)"
                                  >
                                    <Check class="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{{ t('mark-as-read') }}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <div class="block group-hover:hidden">
                              {{ formatDate(not.pivot.createdAt, DateFormats.DISPLAY) }}
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    </FormField>
                  </FormItem>
                </FormField>
              </div>

              <div v-else class="flex justify-center py-3 text-sm">
                <div v-if="!loading" class="text-muted-foreground">
                  {{ t('no-notifications') }}
                </div>
                <Loader2 v-else class="h-8 w-8 animate-spin" />
              </div>
            </DropdownMenuGroup>
          </ScrollArea>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  </Tooltip>
</template>
