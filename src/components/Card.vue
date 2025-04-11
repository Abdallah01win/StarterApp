<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { t } from '@/plugins'

defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <Card class="m-4 gap-y-0 py-0 shadow-none">
    <CardHeader v-if="title || description || $slots.headerAction" class="px-6 pt-4 pb-0">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle v-if="title" class="text-2xl">
            {{ t(title) }}
          </CardTitle>
          <CardDescription v-if="description" class="">
            {{ t(description) }}
          </CardDescription>
        </div>

        <div v-if="$slots.headerAction">
          <slot name="headerAction" />
        </div>
      </div>
    </CardHeader>

    <CardContent :class="{ 'pt-6': !title && !description }">
      <slot name="main" />
    </CardContent>

    <CardFooter v-if="$slots.cardFooter" class="py-4">
      <slot name="cardFooter" />
    </CardFooter>
  </Card>
</template>
