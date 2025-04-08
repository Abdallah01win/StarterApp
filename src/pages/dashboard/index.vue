<script setup lang="ts">
import DateRange from '@/components/DateRange.vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { t } from '@/plugins'
import { useStatsStore } from '@/stores/statsStore'
import { getLocalTimeZone, today } from '@internationalized/date'
import { FileBox, Loader2, PackageCheck, ReceiptText, Wallet } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { type DateRange as DateRangeType } from 'radix-vue'
import { type Ref, onBeforeMount, ref } from 'vue'

import DriversCard from './components/DriversCard.vue'
import FuelCard from './components/FuelCard.vue'
import StatsCard from './components/StatsCard.vue'

const statsStore = useStatsStore()

const { stats } = storeToRefs(statsStore)

const dateRangeInit = {
  start: today(getLocalTimeZone()).subtract({ days: 30 }),
  end: today(getLocalTimeZone())
}

const loading = ref(false)

const dateRange = ref(dateRangeInit) as Ref<DateRangeType>

const fetchStats = () => {
  loading.value = true

  statsStore.fetch(dateRange.value).finally(() => (loading.value = false))
}

onBeforeMount(() => fetchStats())
</script>

<template>
  <ScrollArea class="h-[var(--main-height)] p-4">
    <div>
      <div class="mb-4 flex flex-wrap items-center justify-between space-y-2">
        <h2 class="text-2xl font-semibold">
          {{ t('dashboard') }}
        </h2>
        <div class="flex items-center gap-2 max-md:flex-wrap">
          <DateRange
            v-model="dateRange"
            :max-value="today(getLocalTimeZone())"
            :disabled="loading"
          />

          <Button
            class="max-sm:w-full"
            :disabled="loading || !dateRange.end"
            @click.prevent="fetchStats"
          >
            <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            {{ t('generate') }}
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <StatsCard
          :loading
          :data="stats?.revenue"
          :title="t('total-revenue')"
          :format-value="true"
          suffix="DH"
        >
          <Wallet class="h-4 w-4 text-muted-foreground" />
        </StatsCard>

        <StatsCard :loading :data="stats?.ordered_quantity" :title="t('ordered-quantity')">
          <FileBox class="h-4 w-4 text-muted-foreground" />
        </StatsCard>

        <StatsCard :loading :data="stats?.delivered_quantity" :title="t('delivered-quantity')">
          <PackageCheck class="h-4 w-4 text-muted-foreground" />
        </StatsCard>

        <StatsCard :loading :data="stats?.invoiced_quantity" :title="t('invoiced-quantity')">
          <ReceiptText class="h-4 w-4 text-muted-foreground" />
        </StatsCard>
      </div>
    </div>
  </ScrollArea>
</template>
