import { getFilterName, pageSizeOptions } from '@/helpers'
import type { MetaData } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useParamStore = defineStore('params', () => {
  const filters = new Map<string, string | number | null>()
  const perPage = ref<string>(pageSizeOptions[0])
  const page = ref<number>(1)
  const meta = ref<MetaData>()
  const sorts = ref<string[]>([])

  const getParams = (options?: { list?: boolean }) => {
    if (options?.list) return new URLSearchParams([['list', 'true']])

    const params = new URLSearchParams()

    if (page.value !== 1) params.append('page', page.value.toString())
    if (perPage.value !== pageSizeOptions[0]) params.append('per_page', perPage.value)
    if (sorts.value.length) params.append(`sort`, sorts.value.join(','))

    filters.forEach((value, key) => {
      params.append(`filter[${key}]`, String(value))
    })

    return params
  }

  const setFilter = (alias: string, value?: string | number | null) => {
    const filterName = getFilterName(alias)
    console.log('filterName', filterName, value)

    if (!filterName) return
    if (filterName && (value || value === 0)) filters.set(filterName, value)
  }

  const hasFilter = (alias: string) => {
    const filterName = getFilterName(alias)
    return filterName ? filters.has(filterName) : false
  }

  const removeFilter = (alias: string) => {
    const filterName = getFilterName(alias)
    if (filterName) filters.delete(filterName)
  }

  const setPerPage = (pageSize: string) => {
    perPage.value = pageSize
  }

  const setPage = (nextPage: number) => {
    page.value = nextPage
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

  return {
    pageSizeOptions,
    perPage,
    page,
    meta,
    sorts,
    getParams,
    setPerPage,
    setPage,
    setFilter,
    removeFilter,
    hasFilter,
    setSort,
    clearSorts,
    resetParams
  }
})
