import Api from '../api'
import useProductState from '../../store/useProductState'
import { computed, reactive, readonly, toRefs } from 'vue'
import { IProductCategory } from '../../types/products/productTypes'

interface IPagination {
  path: string | null
  per_page: number | null
  next_page_url: string | null
  prev_page_url: string | null
}

interface IState {
  products: IProductCategory[]
  product: IProductCategory | undefined
  paginate: IPagination
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
  paginate: {
    path: null,
    per_page: null,
    next_page_url: null,
    prev_page_url: null
  },
  loading: false
}

const state = reactive(defaultState)

const useProduct = useProductState()

const getters = {
  nextPage: computed<boolean>(() => (state.paginate.next_page_url ? true : false)),
  handlePaginate: () => (state.paginate.next_page_url ? state.paginate.next_page_url : ''),
  findById: (id: number) => state.products.filter(prod => prod.id === id),
  findBySlug: (slug: string): IProductCategory | undefined => {
    return (state.product = state.products.find(prod => prod.slug === slug))
  }
}

//ACTIONS
const actions = {
  paginate: async (order: string = 'next') => {
    let url: string | undefined = ''

    if (order === 'next') {
      url = state.paginate.next_page_url?.replace('http://localhost:8000/', '')
    }

    if (url) {
      state.loading = true
      await Api.get(url).then(response => {
        setTimeout(() => {
          state.products.push(...response.data.data)
          state.loading = false
          state.paginate = {
            path: response.data.path,
            per_page: response.data.per_page,
            next_page_url: response.data.next_page_url,
            prev_page_url: response.data.prev_page_url
          }
          // console.log('RESPONSE', response.data.data)
          // console.log('STATE', state.products)
        }, 1000)
      })
    }
  },

  getProducts: async () => {
    state.loading = true
    try {
      await Api.get(`api/products/search/?`).then(response => {
        setTimeout(() => {
          state.products.push(...response.data.data)
          state.loading = false
          state.paginate = {
            path: response.data.path,
            per_page: response.data.per_page,
            next_page_url: response.data.next_page_url,
            prev_page_url: response.data.prev_page_url
          }
          // console.log(response.data)
        }, 1000)
      })
    } catch (error: any) {
      console.error(error.response.data)
      state.loading = false
    } finally {
      useProduct.setLoading()
    }
  },

  getProductBySlug: async (slug: string | string[]) => {
    useProduct.setLoading()
    try {
      await Api.post('api/products/search/', {
        slug
      }).then(response => {
        state.product = response.data.data[0]
        // console.log('RESULTADO DO SLUG', response.data.data[0])
      })
    } catch (error: any) {
      console.error(error.response.error)
    } finally {
      useProduct.setLoading()
    }
  }
}

export default () => ({
  state: readonly(state),
  ...actions,
  ...getters,
  products: computed<IProductCategory[] | any>(() => state.products),
  product: computed<IProductCategory | any>(() => state.product)
})
