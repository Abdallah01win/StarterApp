<script setup lang="ts">
import Combobox from '@/components/Combobox.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PopoverContent } from '@/components/ui/popover'
import { t } from '@/plugins'
import { useParamStore } from '@/stores/paramStore'
import { useUserStore } from '@/stores/userStore'
import type { UserFilters } from '@/types'
import { computed, onBeforeUnmount, ref } from 'vue'

const emit = defineEmits(['refresh'])

const userStore = useUserStore()
const paramStore = useParamStore()

const { setFilters, setPage, resetFilters, resetParams } = paramStore

const filters = ref<UserFilters>({})

const hasFilters = computed(() => Object.values(filters.value).some((value) => value))

const onSubmit = () => {
  setFilters<UserFilters>(filters.value)
  setPage(1)

  emit('refresh')
}

const onReset = () => {
  filters.value = {}

  resetFilters()
  emit('refresh')
}

onBeforeUnmount(() => {
  resetFilters()
  resetParams()
})
</script>

<template>
  <PopoverContent class="w-80">
    <form class="grid gap-4">
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="name">{{ t('name') }}: </Label>
          <Input
            id="name"
            v-model="filters.name"
            type="text"
            class="col-span-2 h-8"
            :placeholder="t('enter-a-name')"
          />
        </div>

        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="type">{{ t('type') }}: </Label>
          <Combobox
            id="type"
            v-model="filters.type"
            class="col-span-2"
            size="sm"
            :placeholder="t('type')"
            :options="userStore.getUserTypeOptions"
            :hasSearch="false"
          />
        </div>
      </div>

      <div class="flex items-center justify-end gap-2">
        <Button type="submit" size="sm" :disabled="!hasFilters" @click.prevent="onSubmit">
          {{ t('filter') }}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          :disabled="!hasFilters"
          @click="onReset"
        >
          {{ t('reset') }}
        </Button>
      </div>
    </form>
  </PopoverContent>
</template>
