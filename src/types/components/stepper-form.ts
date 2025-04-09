export type StepperFormProps = {
  formSchema: any[]
  steps: { step: number; title: string; description: string }[]
  loading: boolean
  isEdit: boolean
}
