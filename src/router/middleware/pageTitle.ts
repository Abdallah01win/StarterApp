import { t } from '@/plugins'
import type { RouteLocation } from 'vue-router'

const pageTitleMiddleware = (to: RouteLocation) => {
  const appName = import.meta.env.VITE_APP_NAME
  const routeName = `${to.name.replace(/\//g, '')}`
  const title = routeName.length ? '| ' + (routeName !== '[...path]' ? t(routeName) : '404') : ''

  document.title = `${appName} ${title}`
}

export default pageTitleMiddleware
