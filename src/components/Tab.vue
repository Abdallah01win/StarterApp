<script setup lang="ts" generic="TData extends { id: number }, TValue, TChildData, TChildValue">
import Pagination from '@/components/table/Pagination.vue'
import Table from '@/components/table/Table.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
  <Card class="m-4 max-h-[var(--tab-height)] gap-y-0 py-0 shadow-none">
    <CardHeader class="px-6 py-3 gap-0">
      <div class="flex items-center justify-between">
        <div v-if="routeInfo">
          <CardTitle class="text-2xl">
            {{ t(routeInfo.name) }}
          </CardTitle>
          <CardDescription v-if="routeInfo.description">
            {{ t(routeInfo.description) }}
          </CardDescription>
        </div>

        <div v-can="routeInfo?.createPermission">
          <Button
            size="sm"
            class="cursor-pointer gap-1.5"
            :disabled="loading"
            @click="emit('toggleDialog')"
          >
            <CirclePlus class="size-4" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> {{ t('add') }} </span>
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <Table v-bind="forwarded" @delete="handleDeletion" />
    </CardContent>

    <CardFooter>
      <Pagination @refresh="emit('refresh')" />
    </CardFooter>
  </Card>

  <DeleteDialog
    v-if="openDeleteDialog"
    :open="openDeleteDialog"
    :rowId="rowToDelete"
    @update="toggleDeleteDialog"
    @refresh="emit('refresh')"
  />
</template>
