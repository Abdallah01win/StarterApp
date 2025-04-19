<script setup lang="ts">
import Combobox from '@/components/Combobox.vue'
import DialogFooter from '@/components/DialogFooter.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetForm } from '@/helpers'
import { t } from '@/plugins'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { UserRoles } from '@/types'
import { Form } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'

import getValidationSchema from './schema'

const props = defineProps<{ open: boolean; row?: any }>()

const emit = defineEmits(['update', 'refresh'])

const userStore = useUserStore()
const authStore = useAuthStore()

const { getUserRole } = authStore

const initForm = {
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
  role: null
}

const loading = ref(false)
const form = ref({ ...initForm })

const isEdit = computed(() => !!props.row?.id)
const validationSchema = computed(() => getValidationSchema(isEdit.value))

const initializeFormValue = () => {
  form.value = isEdit.value ? { ...props.row } : { ...initForm }
}

const emitSaveEvents = () => {
  emit('refresh')
  emit('update')
}

const onSubmit = () => {
  loading.value = true

  const data = { ...form.value, role: Number(form.value.role) }

  if (isEdit.value) {
    userStore
      .update(data)
      .then(emitSaveEvents)
      .finally(() => (loading.value = false))
  } else {
    userStore
      .create(data)
      .then(() => {
        emitSaveEvents()
        resetForm(form, initForm)
      })
      .finally(() => (loading.value = false))
  }
}

watch(
  () => props.row?.id,
  () => initializeFormValue()
)

onMounted(() => {
  initializeFormValue()
})
</script>

<template>
  <Dialog :open @update:open="emit('update')">
    <DialogContent class="min-w-[70%]">
      <DialogHeader>
        <DialogTitle>{{ row?.id ? t('edit') : t('create') }}</DialogTitle>
        <DialogDescription aria-describedby="undefined" />
      </DialogHeader>

      <Form v-slot="{ meta }" :validationSchema @submit="onSubmit()">
        <div class="grid grid-cols-3 gap-4">
          <FormField v-slot="{ componentField }" v-model="form.name" name="name">
            <FormItem>
              <FormLabel>{{ t('name') }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" :placeholder="t('enter-a-name')" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-if="!isEdit && getUserRole() === UserRoles.SUPERADMIN"
            v-slot="{ componentField }"
            v-model="form.role"
            name="role"
          >
            <FormItem>
              <FormLabel for="role">{{ t('role') }}</FormLabel>
              <FormControl id="role">
                <Combobox
                  v-bind="componentField"
                  :placeholder="t('select-a-role')"
                  :options="userStore.getUserRoleOptions"
                  :hasSearch="false"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" v-model="form.email" name="email">
            <FormItem>
              <FormLabel>{{ t('email') }}</FormLabel>
              <FormControl>
                <Input type="email" v-bind="componentField" :placeholder="t('enter-an-email')" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" v-model="form.password" name="password">
            <FormItem>
              <FormLabel>{{ t('password') }}</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" :placeholder="t('set-a-password')" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            v-model="form.password_confirmation"
            name="password_confirmation"
          >
            <FormItem>
              <FormLabel>{{ t('confirm-password') }}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  v-bind="componentField"
                  :placeholder="t('confirm-password')"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter :isEdit :loading :isValid="meta.valid" />
      </Form>
    </DialogContent>
  </Dialog>
</template>
