<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { t } from '@/plugins'
import type { SelectProps } from '@/types'
import { type SelectRootEmits, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'base',
  isValid: false
})

const emits = defineEmits<SelectRootEmits>()

const delegatedProps = computed(() => {
  const { modelValue, ...rest } = props

  if (typeof modelValue === 'number') {
    const stringVal = String(modelValue)

    emitUpdate(stringVal)

    return { ...rest, modelValue: stringVal }
  } else {
    return { ...rest, modelValue }
  }
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const emitUpdate = (e: string) => {
  emits('update:modelValue', e)
}
</script>

<template>
  <div>
    <Select
      v-model="forwarded.modelValue"
      :disabled="forwarded.disabled"
      @update:model-value="emitUpdate"
    >
      <SelectTrigger :class="cn(size === 'sm' && 'h-8', isInvalid && '!border-destructive')">
        <SelectValue :placeholder />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <div v-if="options.length === 0" class="text-muted-foreground text-center text-sm">
            {{ t('no-data') }}
          </div>
          <SelectItem
            v-for="el in options"
            v-else
            :key="el.value"
            :value="el.value.toString()"
            :disabled="el.disabled"
          >
            {{ el.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
