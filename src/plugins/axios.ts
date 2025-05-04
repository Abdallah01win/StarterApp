import { ResponseCodes, showToaster } from '@/helpers'
import { locale } from '@/plugins'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useParamStore } from '@/stores/paramStore'
import axios from 'axios'
import Cookies from 'js-cookie'

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale.value
  }
})

Axios.interceptors.request.use((config) => {
  const token = Cookies.get('token')

  if (token) config.headers.set('Authorization', `Bearer ${token}`)

  return Promise.resolve(config)
})

Axios.interceptors.response.use(
  (response) => {
    const acceptedCodes = [ResponseCodes.CREATED, ResponseCodes.ACCEPTED, ResponseCodes.NO_CONTENT]

    if (acceptedCodes.includes(response.status)) showToaster(response.status)

    if (response.config.method === 'get' && response.data.meta)
      useParamStore().meta = response.data.meta

    return response
  },
  ({ response }) => {
    const authStore = useAuthStore()

    if (response.status === ResponseCodes.UNAUTHORIZED) {
      authStore.user = null
      Cookies.remove('token')
      router.push('/')
    }

    showToaster(response.status, response.data.message)

    return Promise.reject(response)
  }
)

export default Axios
