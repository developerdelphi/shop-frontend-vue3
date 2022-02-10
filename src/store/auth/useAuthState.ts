import { computed, reactive, readonly, watch } from 'vue'
import { IAuthState, IAuthData, userDataType, errorsDataType } from '@/types/auth/authTypes'

const STATE_NAME = 'SHOP-USER'

const defaultState: IAuthState = {
  user: {
    name: '',
    email: '',
    created_at: ''
  },
  isAuthenticated: false,
  errors: {
    email: [],
    password: [],
    message: ''
  },
  token: ''
}

const getDefaultState = () => {
  const getLocalStorage = localStorage.getItem(STATE_NAME)
  if (getLocalStorage !== null) {
    return JSON.parse(getLocalStorage)
  }
  localStorage.removeItem(STATE_NAME)
  return defaultState
}

const state: IAuthState = reactive(getDefaultState())

const getters = {
  getErrors: () => computed(() => state.errors),
  isAuthenticated: computed(() => state.isAuthenticated)
}

const actions = {
  setUser: (user: userDataType): void => {
    state.user = user
  },

  setErrors: ({ email, password, message }: errorsDataType) => {
    state.errors.email = email
    state.errors.password = password
    state.errors.message = message
  },

  setAuthenticated: () => (state.isAuthenticated = !state.isAuthenticated),

  authenticate: ({ user, token }: IAuthData) => {
    state.user = user
    state.errors.email = []
    state.errors.password = []
    state.errors.message = ''
    state.isAuthenticated = !state.isAuthenticated
    state.token = token
  },

  resetStore: () => {
    state.user = { name: '', email: '', created_at: '' }
    state.errors.email = []
    state.errors.password = []
    state.errors.message = ''
    state.isAuthenticated = false
  }
}

watch(
  () => state,
  () => {
    localStorage.setItem(STATE_NAME, JSON.stringify(state))
  },
  {
    deep: true
  }
)

export default () => {
  if (localStorage.getItem(STATE_NAME) === null) {
    localStorage.setItem(STATE_NAME, JSON.stringify(state))
  }

  return {
    state: readonly(state),
    ...actions,
    ...getters
  }
}
