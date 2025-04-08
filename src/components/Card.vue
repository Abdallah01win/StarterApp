<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { t } from '@/plugins'
import { ListFilter } from 'lucide-vue-next'

defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <Card class="m-4">
    <CardHeader v-if="title || description || $slots.headerAction" class="px-6 pb-3 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle v-if="title" class="mb-1.5">
            {{ t(title) }}
          </CardTitle>
          <CardDescription v-if="description">
            {{ t(description) }}
          </CardDescription>
        </div>

        <div v-if="$slots.headerAction" class="flex items-center space-x-2">
          <slot name="headerAction" />
          <Popover v-if="$slots.filtersContent">
            <PopoverTrigger>
              <Button variant="outline" class="gap-1.5">
                <ListFilter class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">{{ t('filters') }}</span>
              </Button>
            </PopoverTrigger>
            <slot name="filtersContent" />
          </Popover>
        </div>
      </div>
    </CardHeader>

    <CardContent class="pb-4" :class="{ 'pt-6': !title && !description }">
      <slot name="main" />
    </CardContent>

    <CardFooter v-if="$slots.cardFooter" class="pb-4">
      <slot name="cardFooter" />
    </CardFooter>
  </Card>
</template>
