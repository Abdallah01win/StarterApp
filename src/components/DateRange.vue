<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import { locale, t } from '@/plugins'
import type { CustomCalendarRootProps } from '@/types'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type DateRange, type RangeCalendarRootEmits, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<CustomCalendarRootProps>(), {
  size: 'base',
  dateStyle: 'medium'
})

const emits = defineEmits<RangeCalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const df = new DateFormatter(locale.value, {
  dateStyle: props.dateStyle
})

const updateModelVal = ({ start, end }: DateRange) => {
  forwarded.value.modelValue.start = start
  forwarded.value.modelValue.end = end
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-full justify-start text-left font-normal',
            !forwarded.modelValue && 'text-muted-foreground',
            size === 'sm' && 'h-8 px-3',
            props.class
          )
        "
      >
        <CalendarIcon v-if="size === 'base'" class="mr-2 h-4 w-4" />
        <template v-if="forwarded.modelValue?.start">
          <template v-if="forwarded.modelValue?.end">
            {{ df.format(forwarded.modelValue.start?.toDate(getLocalTimeZone())) }} -
            {{ df.format(forwarded.modelValue.end?.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(forwarded.modelValue.start?.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> {{ t('pick-a-date') }} </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-bind="forwarded"
        initial-focus
        :number-of-months="2"
        @update:model-value="updateModelVal"
      />
    </PopoverContent>
  </Popover>
</template>
