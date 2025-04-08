<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { locales } from '@/lang'
import { colorMode, locale, t } from '@/plugins'
import { Languages, Settings, SunMoon } from 'lucide-vue-next'
import { inject } from 'vue'

const { theme, themes, updateTheme } = inject(colorMode.key)!

const setNewLocale = () => {
  localStorage.setItem('locale', locale.value)
  window.location.reload()
}
</script>

<template>
  <Tooltip>
    <DropdownMenu>
      <TooltipTrigger as-child>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <Settings class="size-4" />
            <span class="sr-only">{{ t('settings') }}</span>
          </Button>
        </DropdownMenuTrigger>
        <TooltipContent>{{ t('settings') }}</TooltipContent>
      </TooltipTrigger>

      <DropdownMenuContent class="w-64">
        <DropdownMenuLabel class="text-center">{{ t('settings') }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages class="mr-2 h-4 w-4" />
              <span>{{ t('language') }}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  v-model="locale"
                  class="w-44"
                  @update:model-value="setNewLocale"
                >
                  <DropdownMenuRadioItem v-for="{ key, label } in locales" :key :value="key">
                    {{ label }}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon class="mr-2 h-4 w-4" />
              <span>{{ t('theme') }}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  v-model="theme"
                  class="w-44"
                  @update:model-value="updateTheme"
                >
                  <DropdownMenuRadioItem v-for="key in themes" :key :value="key">
                    {{ t(key) }}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Tooltip>
</template>
