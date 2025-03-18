import { t } from '@/plugins'
import type { ToasterOption } from '@/types'

export const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const pageSizeOptions = ['10', '20', '50', '100', '200', '500', '1000']

export enum DateFormats {
  DISPLAY = 'DD/MM/YYYY',
  API = 'YYYY-MM-DD',
  LONG = 'LL'
}

export enum ResponseCodes {
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500
}

export const toasterOptions: ToasterOption[] = [
  {
    code: ResponseCodes.CREATED,
    type: 'success',
    title: t('created-successfully')
  },
  {
    code: ResponseCodes.ACCEPTED,
    type: 'success',
    title: t('updated-successfully')
  },
  {
    code: ResponseCodes.NO_CONTENT,
    type: 'success',
    title: t('deleted-successfully')
  },
  {
    code: ResponseCodes.BAD_REQUEST,
    type: 'error',
    title: t('an-error-occurred'),
    description: t('something-went-wrong')
  },
  {
    code: ResponseCodes.UNAUTHORIZED,
    type: 'error',
    title: t('unauthorized'),
    description: t('unauthorized-request')
  }
]

export enum BroadcastChannels {
  NOTIFICATIONS = 'Notification'
}

export enum BroadcastEvents {
  GENERAL = "GeneralEvent"
}

export const asideSizes = {
  collapsed: 4,
  min: 15,
  max: 20
}
