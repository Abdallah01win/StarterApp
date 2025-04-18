import { locale } from '@/plugins'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.locale(locale.value)

dayjs.extend(localizedFormat)
dayjs.extend(localeData)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.extend(timezone)

export default dayjs
