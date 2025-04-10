<script setup lang="ts">
import Combobox from '@/components/Combobox.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { t } from '@/plugins'
import { useParamStore } from '@/stores/paramStore'
import type { FilterableHeaderProps } from '@/types'
import { Filter as FilterIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const props = withDefaults(defineProps<FilterableHeaderProps>(), {
  type: 'string'
})

const emit = defineEmits(['refresh'])

const paramStore = useParamStore()

const open = ref(false)
const val = ref()

const { setFilter, removeFilter, hasFilter } = paramStore

const toggleFilter = () => (open.value = !open.value)

const submit = () => {
  toggleFilter()
  setFilter(props.colName, val.value)
  emit('refresh')
}

const reset = () => {
  toggleFilter()
  removeFilter(props.colName)
  emit('refresh')

  val.value = null
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div>{{ header || t(colName) }}</div>

    <Popover :open @update:open="toggleFilter">
      <PopoverTrigger>
        <Button variant="ghost" size="icon" class="ml-2">
          <FilterIcon class="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-56 p-3">
        <div>
          <Input
            v-if="type === 'string' && !options"
            v-model="val"
            type="text"
            :placeholder="header || t(colName)"
            @keyup.enter="submit"
          />

          <Combobox v-if="options" v-model="val" :placeholder="header || t(colName)" :options />
        </div>

        <div class="mt-3 flex items-center gap-3">
          <Button
            class="grow cursor-pointer"
            size="sm"
            :disabled="!val && val !== 0"
            @click="submit"
          >
            {{ t('filter') }}
          </Button>

          <Button
            class="grow cursor-pointer"
            size="sm"
            variant="secondary"
            :disabled="!hasFilter(props.colName)"
            @click="reset"
          >
            {{ t('reset') }}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
