<script setup lang="ts" generic="TData extends { id: number }, TValue, TChildData, TChildValue">
import Card from '@/components/Card.vue'
import Pagination from '@/components/table/Pagination.vue'
import Table from '@/components/table/Table.vue'
import { Button } from '@/components/ui/button'
import { t } from '@/plugins'
import { routeInfo } from '@/router'
import { useParamStore } from '@/stores/paramStore'
import type { TabCompEmits, TableCompProps } from '@/types'
import { CirclePlus } from 'lucide-vue-next'
import { useForwardPropsEmits } from 'reka-ui'
import { defineAsyncComponent, onBeforeUnmount, ref } from 'vue'

const DeleteDialog = defineAsyncComponent(() => import('@/components/table/DeleteRowDialog.vue'))

const props = withDefaults(defineProps<TableCompProps<TData, TValue, TChildData, TChildValue>>(), {
  hasCreatedAt: true
})

const emit = defineEmits<TabCompEmits<TData>>()

const forwarded = useForwardPropsEmits(props, emit)

const paramStore = useParamStore()

const { resetParams, clearSorts } = paramStore

const openDeleteDialog = ref<boolean>(false)
const rowToDelete = ref<number>()

const toggleDeleteDialog = () => {
  openDeleteDialog.value = !openDeleteDialog.value
}

const handleDeletion = (e: number) => {
  rowToDelete.value = e
  toggleDeleteDialog()
}

onBeforeUnmount(() => {
  resetParams()
  clearSorts()
})
</script>

<template>
  <Card
    :title="routeInfo?.name"
    :description="routeInfo?.description"
    class="max-h-[var(--tab-height)]"
  >
    <template #headerAction>
      <div v-can="routeInfo?.createPermission" class="flex items-center justify-end space-x-2">
        <Button size="sm" class="gap-1.5" :disabled="loading" @click="emit('toggleDialog')">
          <CirclePlus class="h-4 w-4" />
          <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> {{ t('add') }} </span>
        </Button>
      </div>
    </template>

    <template v-if="$slots.filtersContent" #filtersContent>
      <slot name="filtersContent" />
    </template>

    <template #main>
      <Table v-bind="forwarded" @delete="handleDeletion" />
    </template>

    <template #cardFooter>
      <Pagination @refresh="emit('refresh')" />
    </template>
  </Card>

  <DeleteDialog
    v-if="openDeleteDialog"
    :open="openDeleteDialog"
    :rowId="rowToDelete"
    @update="toggleDeleteDialog"
    @refresh="emit('refresh')"
  />
</template>
