<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
    <RouterView />
  </div>

  <Toaster :duration="5000" closeButton />
</template>
