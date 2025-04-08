<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { t } from '@/plugins'
import { useParamStore } from '@/stores/paramStore'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpDown } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{ colName: string; header?: string }>()

const emit = defineEmits(['refresh'])

const paramStore = useParamStore()
const { sorts } = storeToRefs(paramStore)

const sort = () => {
  paramStore.setSort(props.colName)
  emit('refresh')
}

const isSorted = computed(
  () => sorts.value.includes(props.colName) || sorts.value.includes(`-${props.colName}`)
)
</script>

<template>
  <div class="flex items-center justify-between">
    <div>{{ t(header || colName) }}</div>

    <Button class="ml-2" variant="ghost" size="xs" @click="sort">
      <ArrowUpDown v-if="!isSorted" class="h-4 w-4" />
      <ArrowDownWideNarrow
        v-else-if="sorts.includes(`-${props.colName}`)"
        class="h-4 w-4 text-primary"
      />
      <ArrowDownNarrowWide v-else class="h-4 w-4 text-primary" />
    </Button>
  </div>
</template>
