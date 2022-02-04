import Api from '../api'
import useAuthState from '../../store/auth/useAuthState'

const useAuth = useAuthState()

export async function signOut() {
  try {
    await Api.post('api/signout', {}).then(response => {
      // console.log(response.data)
      useAuth.authenticate({ name: '', email: '', created_at: '' })
    })
  } catch (error: any) {
    if (error.response.status === 401) {
      //se authenticação devido a expirar a sessão, remove-se o storage
      useAuth.authenticate({ name: '', email: '', created_at: '' })
    }
  }
}

export default () => ({
  signOut
})
