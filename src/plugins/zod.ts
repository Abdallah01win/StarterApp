import { locale } from '@/plugins'
import i18next from 'i18next'
import * as z from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import fr from 'zod-i18n-map/locales/fr/zod.json'

i18next.init({
  lng: locale.value,
  resources: {
    fr: { zod: fr }
  }
})

z.setErrorMap(zodI18nMap)

export { z }
