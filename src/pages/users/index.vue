<script setup lang="ts">
import Tab from '@/components/Tab.vue'
import { buildDeleteHandler, buildEditHandler, buildFetchData, buildToggleDialog } from '@/helpers'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/types'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent, onBeforeMount, provide, ref } from 'vue'

import { Filters, columns } from './components'

const Dialog = defineAsyncComponent(() => import('./components/Dialog.vue'))

const userStore = useUserStore()

const { fetch, destroy } = userStore
const { users } = storeToRefs(userStore)

const data = ref<User[]>([])
const loading = ref(false)
const openDialog = ref(false)
const user = ref<User>()

const fetchData = buildFetchData<User>(data, users, loading, fetch)

const toggleDialog = buildToggleDialog<User>(user, openDialog)

const handelEdit = buildEditHandler<User>(user, toggleDialog)

provide('handelDelete', buildDeleteHandler(destroy))

onBeforeMount(() => fetchData())
</script>

<template>
  <Tab
    :columns
    :data
    :loading
    @edit="handelEdit"
    @refresh="fetchData"
    @toggle-dialog="toggleDialog"
  >
    <template #filtersContent>
      <Filters @refresh="fetchData" />
    </template>
  </Tab>

  <Dialog
    v-if="openDialog"
    :row="user"
    :open="openDialog"
    @update="toggleDialog"
    @refresh="fetchData"
  />
</template>
