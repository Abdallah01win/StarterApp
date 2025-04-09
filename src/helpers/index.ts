import { DateFormats } from '@/helpers'
import { dayjs, locale, t } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'
import type { Options } from '@/types'
import type { Ref } from 'vue'
import { toast } from 'vue-sonner'

export * from './constants'

export const formatDate = (date: unknown, format: DateFormats = DateFormats.API) => {
  return dayjs(String(date)).format(format)
}

export const formatNumber = (number: number, decimal: number = 2) => {
  return new Intl.NumberFormat(locale.value, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  })
    .format(number)
    .normalize('NFKC')
}

export const showToastError = (msg?: string) => {
  toast.error(t('an-error-occurred'), {
    description: msg || t('something-went-wrong')
  })
}

export const buildFetchData = <T>(
  data: Ref<T[]>,
  values: Ref<T[]>,
  loading: Ref<boolean>,
  fetch: () => Promise<unknown>
) => {
  return async () => {
    loading.value = true
    data.value = []

    await fetch()
      .then(() => (data.value = values.value))
      .finally(() => (loading.value = false))
  }
}

export const buildToggleDialog = <T>(module: Ref<T | undefined>, openDialog: Ref<boolean>) => {
  return () => {
    openDialog.value = !openDialog.value

    if (!openDialog.value) {
      setTimeout(() => {
        module.value = undefined
      }, 100)
    }
  }
}

export const buildEditHandler = <T>(module: Ref<T | undefined>, callback: () => void) => {
  return (val: T) => {
    module.value = val
    callback()
  }
}

export const buildDeleteHandler = (destroy: (id: number) => Promise<unknown>) => {
  return async (e: number) => {
    await destroy(e)
  }
}

export const hasPermission = (permission: string | undefined): boolean => {
  const authStore = useAuthStore()
  const permissions = authStore.user?.permissions || []

  return !permission || (permissions.includes(permission) && true)
}

export const enableFilterOptions = <T extends Options<any>>(options: T) =>
  options.map((opt) => ({ ...opt, disabled: false }))

export const resetForm = <Form extends Ref<any>, Init>(form: Form, initForm: Init) => {
  setTimeout(() => {
    form.value = { ...initForm }
  }, 100)
}
