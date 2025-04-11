<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { t } from '@/plugins'
import type { ComboboxProps } from '@/types'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import type { ComboboxRootEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<ComboboxProps & { class?: HTMLAttributes['class'] }>(), {
  hasSearch: true,
  class: ''
})

const emit = defineEmits<ComboboxRootEmits<ComboboxProps['modelValue']>>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :disabled
        :class="
          cn(
            'w-full justify-between font-normal',
            size === 'sm' && 'h-8 px-3',
            !modelValue && modelValue !== 0 && 'text-muted-foreground hover:text-muted-foreground',
            props.class
          )
        "
      >
        {{
          modelValue || modelValue === 0
            ? options.find((option) => option.value === modelValue)?.label
            : placeholder
        }}
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent :class="cn('p-0', size === 'sm' && 'w-56')">
      <Command>
        <CommandInput v-if="props.hasSearch" :placeholder="t('search')" />
        <CommandEmpty class="py-3">{{ t('no-data') }}</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="(option, index) in options"
              :key="index"
              :value="option.label"
              :disabled="option.disabled"
              class="py-1.5"
              @select="emit('update:modelValue', option.value)"
            >
              <Check
                :class="
                  cn('mr-2 size-4', option.value === modelValue ? 'opacity-100' : 'opacity-0')
                "
              />
              {{ option.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
