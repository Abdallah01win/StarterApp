import { t, z } from '@/plugins'
import { UserTypes } from '@/types'
import { toTypedSchema } from '@vee-validate/zod'

const baseSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  type: z.preprocess((val) => Number(val), z.nativeEnum(UserTypes)).or(z.undefined())
})

const createSchema = z.object({
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
})

const editSchema = z.object({
  password: z.optional(z.string().min(8).or(z.literal(''))),
  password_confirmation: z.optional(z.string().min(8).or(z.literal('')))
})

const getValidationSchema = (isEdit: boolean) => {
  const schema = baseSchema.merge(isEdit ? editSchema : createSchema)

  return toTypedSchema(
    schema.refine(({ password, password_confirmation }) => password === password_confirmation, {
      message: t('validation.passwords-must-match'),
      path: ['password_confirmation']
    })
  )
}

export default getValidationSchema
