import { showToastError } from '@/helpers'
import { locale } from '@/plugins'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
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
  (request) => request,
  (error) => {
    const authStore = useAuthStore()

    const { data, status } = error.response

    if (status === 401) {
      authStore.user = null
      Cookies.remove('token')

      router.push('/')
    }

    showToastError(status !== 500 && data.message)

    return Promise.reject(error)
  }
)

export default Axios
