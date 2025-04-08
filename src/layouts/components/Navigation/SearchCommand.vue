<script setup lang="ts">
import { CommandShortcut } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { t } from '@/plugins'
import { useMagicKeys } from '@vueuse/core'
import { Command as CommandIcon, Search } from 'lucide-vue-next'
import { defineAsyncComponent, ref, watch } from 'vue'

const CommandDialog = defineAsyncComponent(
  () => import('@/layouts/components/Navigation/CommandDialog.vue')
)

const open = ref(false)

const { Meta_Q, Ctrl_Q } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'q' && (e.metaKey || e.ctrlKey)) e.preventDefault()
  }
})

watch([Meta_Q, Ctrl_Q], (v) => {
  if ((v[0] || v[1]) && (open.value || openDialogs() === 0)) handleOpenChange()
})

const openDialogs = () =>
  Array.from(document.body.children).filter(
    (el) => el.tagName === 'DIV' && el.getAttribute('role') === 'dialog'
  ).length

const handleOpenChange = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      id="search"
      class="pl-10 caret-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      type="text"
      autocomplete="off"
      maxlength="0"
      :placeholder="t('search')"
      @click="handleOpenChange"
    />
    <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
      <Search class="size-5 text-muted-foreground" />
    </span>
    <span class="absolute inset-y-0 end-0 flex items-center justify-center px-2">
      <CommandShortcut>
        <span class="flex items-center text-muted-foreground">
          <CommandIcon class="size-3.5" />
          <span class="font-medium">+Q</span>
        </span>
      </CommandShortcut>
    </span>
  </div>

  <CommandDialog v-if="open" :open @update:open="handleOpenChange" />
</template>
