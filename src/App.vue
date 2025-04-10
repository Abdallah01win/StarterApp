<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #tab>
      <RouterView />
    </template>
  </AppLayout>

  <Toaster :duration="5000" />
</template>
