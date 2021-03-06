import Api from '../api'
import useAuthState from '../../store/auth/useAuthState'
import { IAuthData } from '@/types/auth/authTypes'

type SignInDataRequest = {
  email: string
  password: string
}

const authState = useAuthState()

async function SignInRequest(data: SignInDataRequest): Promise<any> {
  try {
    await Api.post('api/signin', data).then(response => {
      const { name, email, created_at, token } = response.data.user
      const dataToAuthenticate: IAuthData = {
        user: { name, email, created_at },
        token
      }
      authState.authenticate(dataToAuthenticate)
      return true
    })
  } catch (error: any) {
    if (error.response.status === 422 || error.response.status === 401) {
      let email: string[] = []
      let password: string[] = []
      let message: string = ''

      if (error.response.data.errors) {
        email = error.response.data.errors.email
        password = error.response.data.errors.password
      }
      if (error.response.data.message) {
        message = error.response.data.message
        // authState.setErrors({ email: [], password: [], message });
      }
      authState.setErrors({ email, password, message })
    }
    return false
  }
}

export default SignInRequest
