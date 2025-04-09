export const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export enum DateFormats {
  DISPLAY = 'DD/MM/YYYY',
  API = 'YYYY-MM-DD',
  LONG = 'LL'
}

export const pageSizeOptions = ['10', '20', '50', '100', '200', '500', '1000']

export const asideSizes = {
  collapsed: 4,
  min: 15,
  max: 20
}
