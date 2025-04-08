<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { t } from '@/plugins'
import { Loader2 } from 'lucide-vue-next'
import { inject, ref } from 'vue'

const props = defineProps<{
  open: boolean
  rowId?: number
}>()

const emit = defineEmits(['update', 'refresh'])

const loading = ref(false)

const handelDelete = inject<(rowId: number) => Promise<void>>('handelDelete')

const destroy = () => {
  if (handelDelete && props.rowId) {
    loading.value = true

    handelDelete(props.rowId)
      .then(() => {
        emit('update')
        emit('refresh')
      })
      .finally(() => (loading.value = false))
  }
}
</script>

<template>
  <Dialog :open @update:open="emit('update')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('delete') }}</DialogTitle>
        <DialogDescription>
          {{ t('confirm-delete-message') }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button type="button" :disabled="loading" @click.prevent="destroy">
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          {{ t('delete') }}
        </Button>
        <DialogClose as-child>
          <Button type="button" variant="secondary"> {{ t('cancel') }} </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
