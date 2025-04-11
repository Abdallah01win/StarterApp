<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { t } from '@/plugins'
import { Loader2 } from 'lucide-vue-next'

const { loading, isEdit, isValid } = defineProps<{
  loading: boolean
  isEdit: boolean
  isValid: boolean
}>()
</script>

<template>
  <DialogFooter class="mt-6">
    <Button type="submit" :disabled="loading || !isValid" class="cursor-pointer">
      <Loader2 v-if="loading" class="mr-1 h-4 w-4 animate-spin" />
      {{ isEdit ? t('save') : t('create') }}
    </Button>

    <DialogClose as-child>
      <Button type="button" :disabled="loading" variant="secondary" class="cursor-pointer">
        {{ t('cancel') }}
      </Button>
    </DialogClose>
  </DialogFooter>
</template>
