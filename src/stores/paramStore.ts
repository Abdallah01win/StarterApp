import { pageSizeOptions } from '@/helpers'
import type { MetaData } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useParamStore = defineStore('params', () => {
  const perPage = ref<string>(pageSizeOptions[0])
  const page = ref<number>(1)
  const meta = ref<MetaData>()
  const sorts = ref<string[]>([])
  const filters = ref()

  const getParams = (options?: { list?: boolean }) => {
    if (options?.list) return new URLSearchParams([['list', 'true']])

    const params = new URLSearchParams()

    if (page.value !== 1) params.append('page', page.value.toString())
    if (perPage.value !== pageSizeOptions[0]) params.append('per_page', perPage.value)
    if (sorts.value.length) params.append(`sort`, sorts.value.join(','))

    if (filters.value) {
      Object.entries(filters.value)
        .filter(([, value]) => {
          if (value && typeof value === 'object') {
            return Object.values(value).every((val) => val !== undefined)
          }
          return value
        })
        .map(([key, value]) => params.append(`filter[${key}]`, String(value)))
    }

    return params
  }

  const setPerPage = (pageSize: string) => {
    perPage.value = pageSize
  }

  const setPage = (nextPage: number) => {
    page.value = nextPage
  }

  const setFilters = <T>(filter: T) => {
    filters.value = filter
  }

  const setSort = (sort: string) => {
    const index = sorts.value.indexOf(sort)
    const negativeIndex = sorts.value.indexOf('-' + sort)

    if (index === -1 && negativeIndex === -1) {
      sorts.value.push(sort)
    } else if (index > -1) {
      sorts.value.splice(index, 1)
      sorts.value.push('-' + sort)
    } else {
      sorts.value.splice(negativeIndex, 1)
    }
  }

  const clearSorts = () => {
    sorts.value = []
  }

  const resetParams = () => {
    perPage.value = pageSizeOptions[0]
    page.value = 1
  }

  const resetFilters = () => {
    filters.value = undefined
  }

  return {
    pageSizeOptions,
    perPage,
    page,
    meta,
    sorts,
    getParams,
    setPerPage,
    setPage,
    setFilters,
    setSort,
    clearSorts,
    resetParams,
    resetFilters
  }
})
