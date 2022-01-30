import Api from '../api';
import useAuthState from '../../store/auth/useAuthState';

type SignInDataRequest = {
  email: string;
  password: string;
};

const authState = useAuthState();

async function SignInRequest(data: SignInDataRequest): Promise<any> {
  try {
    await Api.post('api/signin', data).then((response) => {
      const { name, email, created_at } = response.data.user;
      authState.authenticate({ name, email, created_at });
    });
  } catch (error: any) {
    if (error.response.status === 422 || error.response.status === 401) {
      if (error.response.data.errors) {
        const { email, password, message } = error.response.data.errors;
        authState.setErrors({ email, password, message });
      }
      if (error.response.data.message) {
        const { message } = error.response.data;
        authState.setErrors({ email: [], password: [], message });
      }
    }
  }
}

export default SignInRequest;
