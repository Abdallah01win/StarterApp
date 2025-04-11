import { t } from '@/plugins'
import { z } from 'zod'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const errorMessages = {
    string: {
      required: t('validation.required'),
      minLength: (min: number) => t('validation.min-length', { min }),
      maxLength: (max: number) => t('validation.max-length', { max }),
      email: t('validation.invalid-email')
    },
    number: {
      required: t('validation.must-be-number'),
      min: (min: number) => t('validation.min-number', { min }),
      max: (max: number) => t('validation.max-number', { max })
    },
    enum: t('validation.invalid-option'),
    arguments: t('validation.invalid-input')
  }

  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return issue.expected === 'string'
        ? { message: errorMessages.string.required }
        : issue.expected === 'number'
          ? { message: errorMessages.number.required }
          : { message: ctx.defaultError }

    case z.ZodIssueCode.too_small:
      return issue.type === 'string'
        ? { message: errorMessages.string.minLength(Number(issue.minimum)) }
        : issue.type === 'number'
          ? { message: errorMessages.number.min(Number(issue.minimum)) }
          : { message: ctx.defaultError }

    case z.ZodIssueCode.too_big:
      return issue.type === 'string'
        ? { message: errorMessages.string.maxLength(Number(issue.maximum)) }
        : issue.type === 'number'
          ? { message: errorMessages.number.max(Number(issue.maximum)) }
          : { message: ctx.defaultError }

    case z.ZodIssueCode.invalid_string:
      return issue.validation === 'email'
        ? { message: errorMessages.string.email }
        : { message: ctx.defaultError }

    case z.ZodIssueCode.invalid_enum_value:
      return { message: errorMessages.enum }

    case z.ZodIssueCode.invalid_arguments:
      return { message: errorMessages.arguments }

    default:
      return { message: ctx.defaultError }
  }
}

export default customErrorMap
