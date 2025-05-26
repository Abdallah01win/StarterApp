<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import AppLayout from '@/layouts/AppLayout.vue'
import 'vue-sonner/style.css'
</script>

<template>
  <AppLayout>
    <template #tab>
      <RouterView />
    </template>
  </AppLayout>

  <Toaster :duration="5000" />
</template>
