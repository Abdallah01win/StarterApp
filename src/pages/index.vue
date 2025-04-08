<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { t, z } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

definePage({
  meta: {
    requiresAuth: false,
    hasLayout: false
  }
})

const authStore = useAuthStore()
const { login } = authStore

const loading = ref<boolean>(false)

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
)

const form = useForm({
  validationSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true

  const isValid = await form.validate()

  if (isValid) {
    login(values).finally(() => (loading.value = false))
  }
})
</script>

<template>
  <div class="w-full lg:grid lg:grid-cols-2">
    <div class="flex h-screen items-center justify-center py-12">
      <div class="mx-auto grid w-[400px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">{{ t('login') }}</h1>
          <p class="text-muted-foreground text-balance">
            {{ t('loginDescription') }}
          </p>
        </div>
        <form class="grid gap-4" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>{{ t('email') }}</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  v-bind="componentField"
                  :disabled="loading"
                />
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
                  :placeholder="t('enter-your-password')"
                  :disabled="loading"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="loading || !form.meta.value.valid">
            <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            {{ t('login') }}
          </Button>
        </form>
      </div>
    </div>

    <div class="hidden h-screen lg:block">
      <img
        src="@/assets/images/placeholder.svg"
        alt="Background Image"
        class="h-full w-full object-cover brightness-[.6] grayscale"
      />
    </div>
  </div>
</template>
