import { reactive, readonly } from 'vue';
import { IProduct } from '../types/products/productTypes';

type IState = {
  products: IProduct[];
  loading: boolean;
};

const defaultState: IState = {
  products: [],
  loading: false,
};

const state = reactive(defaultState);

const getters = {};

const actions = {
  setProducts: (products: IProduct[]) => {
    state.products = products;
  },
  setLoading: () => (state.loading = !state.loading),
};

export default () => ({
  state: readonly(state),
  ...actions,
  ...getters,
});
