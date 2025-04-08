<script setup lang="ts" generic="TData extends { id: number }">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { t } from '@/plugins'
import { routeInfo } from '@/router'
import { MoreHorizontal } from 'lucide-vue-next'

defineProps<{
  row: TData
  isPrintable: boolean
}>()

const emit = defineEmits(['print', 'edit', 'delete'])
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-4 w-4 p-0 hover:bg-transparent">
        <span class="sr-only">{{ t('open-menu') }}</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <div v-if="isPrintable">
        <DropdownMenuItem class="cursor-pointer" @click="emit('print', row)">{{
          t('print')
        }}</DropdownMenuItem>
      </div>
      <div v-can="routeInfo?.editPermission">
        <DropdownMenuItem class="cursor-pointer" @click="emit('edit', row)">{{
          t('edit')
        }}</DropdownMenuItem>
      </div>
      <div v-can="routeInfo?.deletePermission">
        <DropdownMenuItem class="cursor-pointer" @click="emit('delete', row.id)">{{
          t('delete')
        }}</DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
