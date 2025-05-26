<script setup lang="ts">
import 'vue-sonner/style.css'
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
