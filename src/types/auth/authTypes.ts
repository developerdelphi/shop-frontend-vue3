type userDataType = {
  name: string
  email: string
  created_at: string
}

type errorsDataType = {
  email?: Array<string>
  password?: Array<string>
  message?: string
}

interface IAuthState {
  user: userDataType
  isAuthenticated: boolean
  errors: errorsDataType
  token?: string
}

interface IAuthData {
  user: userDataType
  token: string
}

export { userDataType, errorsDataType, IAuthState, IAuthData }
