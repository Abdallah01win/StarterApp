<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { pageSizeOptions } from '@/helpers'
import { t } from '@/plugins'
import { useParamStore } from '@/stores/paramStore'
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['refresh'])

const paramStore = useParamStore()

const { setPage, setPerPage } = paramStore

const selectedPageSize = ref<string>(pageSizeOptions[0])

const page = computed(() => paramStore.meta?.current_page || 1)

const total = computed(() => paramStore.meta?.total || 0)

watch(
  () => selectedPageSize.value,
  (newVal) => {
    setPerPage(newVal)
    changePage(1)
  }
)

const changePage = (page: number) => {
  setPage(page)
  emit('refresh')
}
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <div class="text-xs text-muted-foreground">
      <span v-if="total">
        {{ t('showing') }} <strong>{{ paramStore.meta?.from }}-{{ paramStore.meta?.to }}</strong>
        {{ t('of') }}
      </span>
      <strong class="ml-0.5">{{ total }}</strong>
      {{ t('items') }}
    </div>

    <div class="flex items-center space-x-2">
      <Pagination
        :total
        :sibling-count="1"
        :default-page="1"
        :itemsPerPage="parseInt(selectedPageSize)"
        show-edges
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst class="h-7 w-7" @click="changePage(1)" />
          <PaginationPrev class="h-7 w-7" @click="changePage(page - 1)" />
          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="h-7 w-7 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="item.value !== page && changePage(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>
          <PaginationNext class="h-7 w-7" @click="changePage(page + 1)" />
          <PaginationLast class="h-7 w-7" @click="changePage(items.length - 1)" />
        </PaginationList>
      </Pagination>

      <Select id="per-page" v-model="selectedPageSize" :default-value="selectedPageSize">
        <SelectTrigger class="h-7 w-[100px]">
          <SelectValue :placeholder="selectedPageSize" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{{ t('per-page') }}</SelectLabel>
            <SelectItem v-for="size in pageSizeOptions" :key="size" :value="size">
              {{ size }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
