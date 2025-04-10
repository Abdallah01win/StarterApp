import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import { authMiddleware, pageTitleMiddleware, permissionMiddleware } from './middleware'

export * from './utils'
export { default as filtersMap } from './filtersMap'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authMiddleware)
router.beforeEach(permissionMiddleware)
router.afterEach(pageTitleMiddleware)

export default router
