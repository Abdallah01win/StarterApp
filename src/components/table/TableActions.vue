<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { t } from '@/plugins'
import { Icon } from '@iconify/vue'

const { row, actions = [] } = defineProps<{
  row: Record<string, string | number> & { id: number }
  actions?: { name: string; icon: string; action: (row: any) => unknown }[]
}>()

const emit = defineEmits(['edit', 'delete'])

const baseActions = [
  ...actions,
  {
    name: 'edit',
    icon: 'pencil',
    action: () => emit('edit', row)
  },
  {
    name: 'delete',
    icon: 'trash-2',
    action: () => emit('delete', row.id)
  }
]
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="flex items-center gap-1.5">
      <Button
        v-for="action in baseActions"
        :key="action.name"
        class="size-6 cursor-pointer"
        variant="outline"
        size="icon"
        @click="action.action(row)"
      >
        <Icon :icon="`lucide:${action.icon}`" class="size-3.5" />
        <span class="sr-only">{{ t(action.name) }}</span>
      </Button>
    </div>
  </div>
</template>
