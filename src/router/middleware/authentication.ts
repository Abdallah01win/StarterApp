import { showToastError } from '@/helpers'
import { t } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'
import type { NavigationGuardNext, RouteLocation } from 'vue-router'

const authMiddleware = async (to: RouteLocation, _: RouteLocation, next: NavigationGuardNext) => {
  const authStore = useAuthStore()

  const isAuthenticated = await authStore.initUser().catch(() => false)
  const requiresAuth = to.meta.requiresAuth !== false

  authStore.resetLoading()

  if (requiresAuth && !isAuthenticated) {
    showToastError(t('unauthorized'))

    return next({ name: '/' })
  }

  if (to.name === '/' && isAuthenticated) return next({ name: '/dashboard/' })

  next()
}

export default authMiddleware
