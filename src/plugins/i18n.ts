import { languages, locales } from '@/lang'
import { createI18n } from 'vue-i18n'

const storedLocal = localStorage.getItem('locale')
let localeLang

if (storedLocal && locales.find((l) => l.key === storedLocal)) {
  localeLang = storedLocal
} else {
  localeLang = locales[1].key
  localStorage.setItem('locale', localeLang)
}

const i18n = createI18n({
  legacy: false,
  locale: localeLang,
  fallbackLocale: locales[0].key,
  messages: languages
})

export const { t, locale } = i18n.global

export default i18n
