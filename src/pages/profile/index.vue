<script setup lang="ts">
import Card from '@/components/Card.vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { t } from '@/plugins'
import { currentRouteName } from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { Loader2, User2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'

import validationSchema from './components/schema'

const authStore = useAuthStore()
const userStore = useUserStore()

const form = useForm({
  validationSchema,
  initialValues: {
    id: authStore.user?.id,
    name: authStore.user?.name
  }
})

const loading = ref(false)

const getCurrentUserType = computed(
  () => authStore.user && userStore.getUserType(authStore.user.role)
)

const isSaveDisabled = computed(
  () => loading.value || (form.values.name === authStore.user?.name && !form.values.password)
)

const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true

  const isValid = await form.validate()

  if (isValid) {
    userStore.update(values).finally(() => {
      loading.value = false
    })
  }
})
</script>

<template>
  <div class="grid gap-4 p-4 lg:grid-cols-3 xl:grid-cols-3">
    <Card class="m-0 h-fit pb-6">
      <template #main>
        <div class="flex items-center gap-4">
          <Avatar class="size-12">
            <AvatarFallback class="font-semibold uppercase">
              <User2 class="size-6" />
            </AvatarFallback>
          </Avatar>

          <div class="grid w-full gap-1">
            <div class="flex items-center justify-between gap-4">
              <p class="text-sm leading-none font-medium">
                {{ authStore.user?.name }}
              </p>
              <Badge variant="secondary">{{ getCurrentUserType }}</Badge>
            </div>

            <p class="text-muted-foreground text-sm">
              {{ authStore.user?.email }}
            </p>
          </div>
        </div>
      </template>
    </Card>

    <Card :title="currentRouteName" class="m-0 pb-6 lg:col-span-2">
      <template #main>
        <form class="grid gap-4" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>{{ t('name') }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('password') }}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  v-bind="componentField"
                  :placeholder="t('enter-new-password')"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password_confirmation">
            <FormItem>
              <FormLabel>{{ t('confirm-password') }}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  v-bind="componentField"
                  :placeholder="t('confirm-new-password')"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-fit cursor-pointer" :disabled="isSaveDisabled">
            <Loader2 v-if="loading" class="mr-1 h-4 w-4 animate-spin" />
            {{ t('save') }}
          </Button>
        </form>
      </template>
    </Card>
  </div>
</template>
