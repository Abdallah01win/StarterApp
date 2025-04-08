import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './style.css'
import { hasPermission } from './helpers'
import { colorMode, i18n } from './plugins'
import router from './router'

const { key, themes, theme, updateTheme } = colorMode

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(i18n)

app.provide(key, { themes, theme, updateTheme })

app.directive('can', (_, binding, vnode) => {
  if (!hasPermission(binding.value)) {
    vnode.el.hidden = true
    vnode.el.remove()
  }
})

app.mount('#app')
