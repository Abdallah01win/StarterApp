<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'
import { ResizablePanel } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { asideSizes } from '@/helpers'
import { cn } from '@/lib/utils'
import { t } from '@/plugins'
import { currentRouteName, routesMap } from '@/router'
import { Icon } from '@iconify/vue'
import { Waypoints } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const isCollapsed = ref(true)

const defaultSize = computed(() =>
  localStorage.getItem('isCollapsed') === 'true' ? asideSizes.collapsed : asideSizes.min
)

const onCollapse = () => {
  localStorage.setItem('isCollapsed', 'true')
  isCollapsed.value = true
}

const onExpand = () => {
  localStorage.setItem('isCollapsed', 'false')
  isCollapsed.value = false
}
</script>

<template>
  <ResizablePanel
    id="resize-panel-1"
    collapsible
    :defaultSize
    :collapsed-size="asideSizes.collapsed"
    :min-size="asideSizes.min"
    :max-size="asideSizes.max"
    :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
    @expand="onExpand"
    @collapse="onCollapse"
  >
    <div
      :class="cn('flex h-[56px] items-center justify-center', isCollapsed ? 'h-[56px]' : 'px-2')"
    >
      <div class="flex items-center text-sm">
        <Waypoints class="h-5 w-5" />
        <span v-if="!isCollapsed" class="ml-1">
          <span class="text-muted-foreground font-medium">Logist</span>
          <span class="font-semibold">Xpert</span>
        </span>
      </div>
    </div>
    <Separator />
    <div
      :data-collapsed="isCollapsed"
      class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav
        class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
      >
        <div v-for="(link, index) of routesMap" :key="`1-${index}`" v-can="link.viewPermission">
          <Tooltip v-if="isCollapsed" :delay-duration="0">
            <TooltipTrigger as-child>
              <RouterLink
                :to="`/${link.name}`"
                :class="
                  cn(
                    buttonVariants({
                      variant: link.name === currentRouteName ? 'default' : 'ghost',
                      size: 'icon'
                    }),
                    'h-9 w-9',
                    link.name === currentRouteName &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                  )
                "
              >
                <Icon :icon="link.icon" class="size-4" />
                <span class="sr-only">{{ t(link.name) }}</span>
              </RouterLink>
            </TooltipTrigger>
            <TooltipContent side="right" class="flex items-center gap-4">
              {{ t(link.name) }}
            </TooltipContent>
          </Tooltip>

          <RouterLink
            v-else
            :key="`2-${index}`"
            :to="`/${link.name}`"
            :class="
              cn(
                buttonVariants({
                  variant: link.name === currentRouteName ? 'default' : 'ghost',
                  size: 'sm'
                }),
                link.name === currentRouteName &&
                  'dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white',
                'w-full justify-start'
              )
            "
          >
            <Icon :icon="link.icon" class="mr-2 size-4" />
            <span>{{ t(link.name) }}</span>
          </RouterLink>
        </div>
      </nav>
    </div>
  </ResizablePanel>
</template>
