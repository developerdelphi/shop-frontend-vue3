import { computed, reactive, readonly, watch } from 'vue';

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

const STATE_NAME = 'SHOP-USER';

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

const getDefaultState = () => {
  if (localStorage.getItem(STATE_NAME) !== null) {
    return JSON.parse(localStorage.getItem(STATE_NAME));
  }
  return defaultState;
};

const state = reactive(getDefaultState());

const getters = {
  getErrors: () => computed(() => state.errors),
  isAuthenticated: computed(() => state.isAuthenticated),
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

watch(
  () => state,
  () => {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  },
  {
    deep: true,
  }
);

export default () => {
  if (localStorage.getItem(STATE_NAME) === null) {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  }

  return {
    state: readonly(state),
    ...actions,
    ...getters,
  };
};
