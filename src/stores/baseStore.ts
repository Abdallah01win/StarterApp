import { axios } from '@/plugins'

export const baseCreate = (endpoint: string) => {
  return (form: Record<string, any>) => {
    return new Promise((resolve, reject) => {
      axios.post(endpoint, form).then(
        () => resolve(true),
        () => reject()
      )
    })
  }
}

export const baseUpdate = (endpoint: string) => {
  return (form: Record<string, any>) => {
    return new Promise((resolve, reject) => {
      axios.put(`${endpoint}/${form.id}`, form).then(
        () => resolve(true),
        () => reject()
      )
    })
  }
}

export const baseDestroy = (endpoint: string) => {
  return (id: number) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${endpoint}/${id}`).then(
        () => resolve(true),
        () => reject()
      )
    })
  }
}
