<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatNumber } from '@/helpers'
import { t } from '@/plugins'
import { useStatsStore } from '@/stores/statsStore'
import { StatCardProps } from '@/types'

const props = defineProps<StatCardProps>()

const statsStore = useStatsStore()

const getStatDiff = () => {
  const current = props.data?.current ?? 0
  const previous = props.data?.previous ?? 0

  const diff = current - previous
  const diffPercent = current === 0 && previous > 0 ? -100 : diff === 0 ? 0 : (diff / current) * 100

  return t('stats-description', {
    valSign: diff > 0 ? '+' : '',
    percentage: diffPercent.toFixed(2),
    days: statsStore.daysDiff
  })
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium">{{ title }}</CardTitle>
      <slot />
    </CardHeader>
    <CardContent>
      <div v-if="loading" class="space-y-3.5">
        <Skeleton class="h-4 w-48" />
        <Skeleton class="h-4 w-44" />
      </div>
      <div v-else>
        <div class="text-2xl font-bold">
          {{ formatValue ? formatNumber(data?.current || 0) : data?.current }} {{ suffix ?? '' }}
        </div>
        <p class="text-xs text-muted-foreground">{{ getStatDiff() }}</p>
      </div>
    </CardContent>
  </Card>
</template>
