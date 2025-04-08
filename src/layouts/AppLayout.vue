<script lang="ts" setup>
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import Aside from '@/layouts/components/Aside.vue'
import Nav from '@/layouts/components/Navigation/index.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { Loader2 } from 'lucide-vue-next'
import { computed } from 'vue'

const authStore = useAuthStore()

const hasLayout = computed(() => {
  const { name, meta } = router.currentRoute.value

  return meta?.hasLayout !== false && name
})
</script>

<template>
  <Transition>
    <div v-if="authStore.loading" class="flex h-screen items-center justify-center bg-background">
      <Loader2 class="h-9 w-9 animate-spin" />
    </div>
  </Transition>

  <div v-if="hasLayout" class="h-screen">
    <TooltipProvider :delay-duration="0">
      <ResizablePanelGroup
        id="resize-panel-group-1"
        direction="horizontal"
        class="h-full items-stretch"
      >
        <Aside />
        <ResizableHandle id="resize-handle-1" />
        <ResizablePanel id="resize-panel-2">
          <Nav />
          <div>
            <slot name="tab" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  </div>

  <div v-else>
    <slot name="tab" />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
