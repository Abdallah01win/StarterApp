<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { t } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'
import { Loader2, LogOut, User2 } from 'lucide-vue-next'
import { ref } from 'vue'

const authStore = useAuthStore()

const loading = ref(false)

const logoutUser = () => {
  loading.value = true

  authStore.logout().finally(() => (loading.value = false))
}
</script>

<template>
  <Dialog>
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger as-child>
          <DropdownMenuTrigger>
            <Avatar class="cursor-pointer">
              <AvatarFallback class="text-xs font-semibold uppercase">
                {{ authStore.user?.name.substring(0, 2) }}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <TooltipContent>{{ t('profile') }}</TooltipContent>
        </TooltipTrigger>

        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel class="text-center">{{ authStore.user?.name }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <RouterLink to="/profile">
              <DropdownMenuItem>
                <User2 class="mr-2 h-4 w-4" />
                <span>{{ t('profile') }}</span>
              </DropdownMenuItem>
            </RouterLink>
            <DropdownMenuSeparator />

            <DialogTrigger class="w-full">
              <DropdownMenuItem>
                <LogOut class="mr-2 h-4 w-4" />
                <span>{{ t('logout') }}</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('logout') }}</DialogTitle>
        <DialogDescription>
          {{ t('logout-description') }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click="logoutUser">
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          {{ t('logout') }}
        </Button>
        <DialogClose as-child>
          <Button type="button" variant="outline" :disabled="loading">
            {{ t('cancel') }}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
