import { useColorMode } from '@vueuse/core'
import type { InjectionKey } from 'vue'

const themes: readonly ('light' | 'dark' | 'auto')[] = ['light', 'dark', 'auto'] as const

const theme = useColorMode({ disableTransition: false })

const updateTheme = (newTheme: string) => {
  theme.value = newTheme as typeof theme.value
}

const key = Symbol('theme') as InjectionKey<{
  theme: typeof theme
  themes: typeof themes
  updateTheme: (newTheme: string) => void
}>

export default { themes, key, theme, updateTheme }
