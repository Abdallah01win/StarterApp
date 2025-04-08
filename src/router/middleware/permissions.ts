import { hasPermission } from '@/helpers'
import routesMap from '@/router/routesMap'
import type { NavigationGuardNext, RouteLocation } from 'vue-router/auto'

const permissionMiddleware = async (
  to: RouteLocation,
  _: RouteLocation,
  next: NavigationGuardNext
) => {
  const routeName = to.name.replace(/\//g, '')
  const routePermission = routesMap.find(({ name }) => name === routeName)?.viewPermission

  if (hasPermission(routePermission)) next()
  else next({ path: '404' })
}

export default permissionMiddleware
