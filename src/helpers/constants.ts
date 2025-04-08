import type { TaxRateOptions } from '@/types'

export const pageSizeOptions = ['10', '20', '50', '100', '200', '500', '1000']

export const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
export const iceRegex = new RegExp(/^[0-9]{1,64}$/)
export const ifRegex = new RegExp(/^[0-9]{1,64}$/)
export const rcRegex = new RegExp(/^[0-9]{1,64}$/)
export const cinRegex = new RegExp(/^[A-Z]{2}[0-9]{2,8}$/)
export const ssnRegex = new RegExp(/^[0-9]{4,64}$/)

export const taxRates: TaxRateOptions = [
  { label: '10%', value: 10 },
  { label: '12%', value: 12 },
  { label: '20%', value: 20 }
]

export const asideSizes = {
  collapsed: 4,
  min: 15,
  max: 20
}
