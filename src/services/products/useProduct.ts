import Api from '../api';
import useProductState from '../../store/useProductState';
import { reactive, toRefs } from 'vue';
import { IProduct } from '../../types/products/productTypes';

interface IState {
  products: IProduct[];
  loading: boolean;
}

const state: IState = reactive({
  products: [],
  loading: false,
});

const useProduct = useProductState();

async function getProducts() {
  useProduct.setLoading();
  state.loading = true;
  try {
    await Api.get('api/products').then((response) => {
      useProduct.setProducts(response.data);
      setTimeout(() => {
        state.products = response.data;
        state.loading = false;
      }, 2000);
    });
  } catch (error: any) {
    console.error(error.response.data);
  } finally {
    useProduct.setLoading();
  }
}

export default () => ({ getProducts, ...toRefs(state) });
