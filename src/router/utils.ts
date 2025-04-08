import { computed } from 'vue'

import router from '.'
import routesMap from './routesMap'

const currentRouteName = computed(() => {
  return router.currentRoute.value.name?.replace(/\//g, '')
})

const routeInfo = computed(() => {
  return routesMap.find(({ name }) => name === currentRouteName.value)
})

export { routesMap, currentRouteName, routeInfo }
