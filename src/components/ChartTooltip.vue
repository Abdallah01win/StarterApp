<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { t } from '@/plugins'

defineProps<{
  title?: string
  data: {
    name: string
    color: string
    value: any
  }[]
}>()
</script>

<template>
  <Card class="text-sm">
    <CardHeader v-if="title" class="border-b p-3 py-1.5">
      <CardTitle class="text-base">
        {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent class="flex min-w-[180px] flex-col gap-x-1.5 gap-y-1 p-3">
      <div v-for="(item, key) in data" :key="key" class="flex justify-between">
        <div class="flex items-center">
          <span class="mr-2 size-2.5">
            <svg width="100%" height="100%" viewBox="0 0 30 30">
              <path
                d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                :stroke="item.color"
                :fill="item.color"
                stroke-width="1"
              />
            </svg>
          </span>
          <span>{{ t(item.name) }}</span>
        </div>
        <span class="ml-4 font-semibold">{{ item.value }}</span>
      </div>
    </CardContent>
  </Card>
</template>
