import Api from '../api';
type SignInDataRequest = {
  email: string;
  password: string;
};

async function SignInRequest(data: SignInDataRequest) {
  try {
    Api.post('api/signin', data).then((response) => {
      console.log(response.data);
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export default SignInRequest;
