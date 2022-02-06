import Api from '../api'
import useProductState from '../../store/useProductState'
import { computed, reactive, readonly, toRefs } from 'vue'
import { IProduct, IProductCategory } from '../../types/products/productTypes'
interface IState {
  products: IProductCategory[]
  product: IProductCategory | undefined
  loading: boolean
}

const defaultState: IState = {
  products: [],
  product: {
    id: 0,
    category_id: 0,
    slug: '',
    name: '',
    description: '',
    price: 0,
    status: '',
    category: {
      id: 0,
      name: '',
      slug: ''
    }
  },
  loading: false
}

const state = reactive(defaultState)

const useProduct = useProductState()

async function getProducts() {
  useProduct.setLoading()
  state.loading = true
  try {
    await Api.get('api/products').then(response => {
      useProduct.setProducts(response.data)
      state.products = response.data
      state.loading = false
    })
  } catch (error: any) {
    console.error(error.response.data)
  } finally {
    useProduct.setLoading()
  }
}

async function getProductBySlug(slug: string | string[]) {
  useProduct.setLoading()
  try {
    await Api.post('api/products/search/', {
      slug
    }).then(response => {
      state.product = response.data[0]
      // console.log('RESULTADO DO SLUG', response.data[0])
    })
  } catch (error: any) {
    console.error(error.response.error)
  } finally {
    useProduct.setLoading()
  }
}

function findById(id: number) {
  return state.products.filter(prod => prod.id === id)
}

function findBySlug(slug: string): IProductCategory | undefined {
  return (state.product = state.products.find(prod => prod.slug === slug))
}

export default () => ({
  state: readonly(state),
  products: computed(() => state.products),
  product: computed(() => state.product),
  findById,
  findBySlug,
  getProducts,
  getProductBySlug
})
