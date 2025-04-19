<script setup lang="ts">
import DateRange from '@/components/DateRange.vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { t } from '@/plugins'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Loader2 } from 'lucide-vue-next'
import { type DateRange as DateRangeType } from 'reka-ui'
import { type Ref, ref } from 'vue'

const dateRangeInit = {
  start: today(getLocalTimeZone()).subtract({ days: 30 }),
  end: today(getLocalTimeZone())
}

const loading = ref(false)
const dateRange = ref(dateRangeInit) as Ref<DateRangeType>
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

          <Button class="max-sm:w-full" :disabled="loading || !dateRange.end">
            <Loader2 v-if="loading" class="mr-1 h-4 w-4 animate-spin" />
            {{ t('generate') }}
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <!-- Stats Components -->
      </div>
    </div>
  </ScrollArea>
</template>
