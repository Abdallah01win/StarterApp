<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { t } from '@/plugins'
import router from '@/router'
import { ArrowLeft } from 'lucide-vue-next'
import { onBeforeUnmount, ref } from 'vue'

definePage({
  meta: {
    requiresAuth: false,
    hasLayout: false
  }
})

const remainingTime = ref(5)

const timer = setInterval(() => {
  remainingTime.value -= 1

  if (remainingTime.value <= 0) {
    clearInterval(timer)
    router.push('/dashboard')
  }
}, 1000)

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <main class="relative flex h-screen w-full flex-col items-center justify-center bg-background">
    <div class="text-center">
      <h1 class="relative">
        <span class="text-[150px] font-bold text-primary/10 lg:text-[250px]">404</span>
        <span
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-foreground lg:text-6xl"
        >
          Oops!
        </span>
      </h1>

      <div class="mt-8 max-w-lg px-4">
        <h2 class="mb-4 text-lg font-semibold text-foreground">
          {{ t('404-description') }} {{ remainingTime }}s
        </h2>
        <p class="mb-8 text-sm text-muted-foreground">
          {{ t('404-detailed-desc') }}
        </p>

        <RouterLink
          to="/dashboard"
          class="btn btn-primary mb-4 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3"
        >
          <Button variant="outline" class="flex items-center gap-2">
            <ArrowLeft class="h-5 w-5" />
            <span>{{ t('go-back-home') }}</span>
          </Button>
        </RouterLink>
      </div>
    </div>
  </main>
</template>
