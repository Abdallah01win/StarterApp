import { axios } from '@/plugins'
import type { fetchParams } from '@/types'

import { useParamStore } from './paramStore'

export const construct = (params: fetchParams) => ({
  fetch: fetch(params),
  create: create(params.endpoint),
  update: update(params.endpoint),
  destroy: destroy(params.endpoint)
})

export const fetch = ({ endpoint, tableData, listData }: fetchParams) => {
  return (options?: { list?: boolean }) => {
    const paramStore = useParamStore()
    const params = paramStore.getParams({ ...options })

    return new Promise((resolve, reject) => {
      axios.get(endpoint, { params }).then(
        ({ data }) => {
          if (options?.list && listData) {
            listData.value = data.data
          } else {
            tableData.value = data.data
          }

          resolve(true)
        },
        () => reject(null)
      )
    })
  }
}

export const create = (endpoint: string) => {
  return (form: Record<string, any>) => {
    return new Promise((resolve, reject) => {
      axios.post(endpoint, form).then(
        () => resolve(true),
        () => reject()
      )
    })
  }
}

export const update = (endpoint: string) => {
  return (form: Record<string, any>) => {
    return new Promise((resolve, reject) => {
      axios.put(`${endpoint}/${form.id}`, form).then(
        () => resolve(true),
        () => reject()
      )
    })
  }
}

export const destroy = (endpoint: string) => {
  return (id: number) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${endpoint}/${id}`).then(
        () => resolve(true),
        () => reject()
      )
    })
  }
}
