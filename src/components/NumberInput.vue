<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { NumberInputProps } from '@/types'
import { useVModel } from '@vueuse/core'
import { Minus, Plus } from 'lucide-vue-next'

const props = withDefaults(defineProps<NumberInputProps>(), { min: 0 })

const emits = defineEmits<{
  (e: 'update:modelValue', payload: number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const incrementVal = () =>
  typeof modelValue.value === 'number' ? modelValue.value++ : (modelValue.value = props.min || 0)

const decrementVal = () =>
  typeof modelValue.value === 'number' ? modelValue.value-- : (modelValue.value = props.min || 0)
</script>

<template>
  <div class="relative">
    <Button
      variant="ghost"
      size="icon"
      type="button"
      class="absolute left-0 top-1/2 -translate-y-1/2 p-3 hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-20"
      :disabled="(min !== false && min >= Number(modelValue)) || disabled"
      tabindex="-1"
      @click="decrementVal"
    >
      <Minus class="h-4 w-4" />
    </Button>

    <Input
      v-model="modelValue"
      type="number"
      :class="cn('text-center', props.class)"
      :min
      :max
      :disabled
      tabindex="0"
    />

    <Button
      variant="ghost"
      size="icon"
      type="button"
      class="absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-20"
      :disabled="(max && max >= Number(modelValue)) || disabled"
      tabindex="-1"
      @click="incrementVal"
    >
      <Plus class="h-4 w-4" />
    </Button>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
