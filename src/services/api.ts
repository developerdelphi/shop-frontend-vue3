import axios from 'axios'
import useAuthState from '../store/auth/useAuthState'

const useAuth = useAuthState()

const Api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
})

Api.interceptors.response.use(
  response => response,
  async err => {
    const status = err.response.status

    if (status === 419) {
      // Refresh our session token
      await Api.get('sanctum/csrf-cookie')

      // Return a new request using the original request's configuration
      return Api(err.response.config)
    }

    if (status === 401) {
      console.error('ERRO 401 CAPTURADO')
      // useAuth.authenticate({ name: '', email: '', created_at: '' })
      // router.push({ name: 'signin' })
    }

    return Promise.reject(err)
  }
)

export default Api
