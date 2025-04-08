<script setup lang="ts">
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { t } from '@/plugins'
import { routesMap } from '@/router'
import { VisuallyHidden } from 'radix-vue'

const { open } = defineProps<{
  open: boolean
}>()

const emit = defineEmits(['update:open'])
</script>

<template>
  <CommandDialog :open @update:open="emit('update:open')">
    <VisuallyHidden asChild>
      <DialogTitle />
    </VisuallyHidden>
    <DialogDescription />
    <CommandInput :placeholder="t('search')" />
    <CommandList>
      <ScrollArea class="h-72">
        <CommandEmpty>{{ t('no-results') }}</CommandEmpty>
        <CommandGroup :heading="t('suggestions')">
          <RouterLink v-for="route in routesMap" :key="route.name" :to="route.name">
            <CommandItem :value="t(route.name)" @select="emit('update:open')">
              {{ t(route.name) }}
            </CommandItem>
          </RouterLink>
        </CommandGroup>
      </ScrollArea>
      <CommandSeparator />
    </CommandList>
  </CommandDialog>
</template>
