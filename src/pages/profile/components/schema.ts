import { t, z } from '@/plugins'
import { toTypedSchema } from '@vee-validate/zod'

export default toTypedSchema(
  z
    .object({
      id: z.number(),
      name: z.string().min(4),
      password: z.string().min(8).optional(),
      password_confirmation: z.string().min(8).optional()
    })
    .refine(
      (values) => {
        return values.password === values.password_confirmation
      },
      {
        message: t('passwords-must-match'),
        path: ['password_confirmation']
      }
    )
)
