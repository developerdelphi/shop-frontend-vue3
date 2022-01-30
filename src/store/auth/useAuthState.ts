import { computed, reactive, readonly } from 'vue';

type userData = {
  name: string;
  email: string;
  created_at: string;
};

type errorsData = {
  email?: Array<string>;
  password?: Array<string>;
  message?: string;
};

interface State {
  user: userData;
  isAuthenticated: boolean;
  errors: errorsData;
}

const defaultState: State = {
  user: {
    name: '',
    email: '',
    created_at: '',
  },
  isAuthenticated: false,
  errors: {
    email: [],
    password: [],
    message: '',
  },
};

const state = reactive(defaultState);

const getters = {
  getErrors: () => computed(() => state.errors),
};

const actions = {
  setUser: (user: userData): void => {
    state.user = user;
  },

  setErrors: ({ email, password, message }: errorsData) => {
    state.errors.email = email;
    state.errors.password = password;
    state.errors.message = message;
  },

  setAuthenticated: () => (state.isAuthenticated = !state.isAuthenticated),

  authenticate: (user: userData) => {
    state.user = user;
    state.errors.email = [];
    state.errors.password = [];
    state.errors.message = '';
    state.isAuthenticated = true;
  },

  resetStore: () => {
    state.user = { name: '', email: '', created_at: '' };
    state.errors.email = [];
    state.errors.password = [];
    state.errors.message = '';
    state.isAuthenticated = false;
  },
};

export default () => ({
  state: readonly(state),
  ...actions,
  ...getters,
});
