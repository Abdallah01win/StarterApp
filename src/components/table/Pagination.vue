<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious
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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['refresh'])

const paramStore = useParamStore()

const { setPage, setPerPage } = paramStore

const selectedPageSize = ref<string>(pageSizeOptions[0])

const page = computed(() => paramStore.meta?.currentPage || 1)

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
  <div class="flex w-full items-center justify-between py-3">
    <div class="text-muted-foreground text-xs">
      <span v-if="total">
        {{ t('showing') }} <strong>{{ paramStore.meta?.from }} - {{ paramStore.meta?.to }}</strong>
        {{ t('of') }}
      </span>
      <strong class="ml-1">{{ total }}</strong>
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
        <PaginationContent v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst class="size-7 cursor-pointer" @click="changePage(1)">
            <ChevronsLeft />
          </PaginationFirst>
          <PaginationPrevious class="size-7 cursor-pointer" @click="changePage(page - 1)">
            <ChevronLeft />
          </PaginationPrevious>

          <template v-for="(item, index) in items">
            <PaginationItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button
                class="size-7 cursor-pointer p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="item.value !== page && changePage(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext class="size-7 cursor-pointer" @click="changePage(page + 1)">
            <ChevronRight />
          </PaginationNext>
          <PaginationLast class="size-7 cursor-pointer" @click="changePage(items.length - 1)">
            <ChevronsRight />
          </PaginationLast>
        </PaginationContent>
      </Pagination>

      <Select id="per-page" v-model="selectedPageSize">
        <SelectTrigger class="!h-7 w-[100px]">
          <SelectValue />
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
