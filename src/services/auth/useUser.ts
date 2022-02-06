import { computed, reactive, toRefs } from 'vue'
import Api from '@/services/api'

const state = reactive({
  user: {},
  orders: { data: [] }
})

const getters = {
  getOrders: () => computed(() => state.orders.data)
}

const actions = {
  getUser: async () => {
    try {
      await Api.get('api/user/').then(({ data }) => (state.user = data))
    } catch (error: any) {
      // console.error(error.response.data.errors)
    }
  },

  requestOrders: async () => {
    try {
      await Api.get('api/orders/user').then(response => {
        // console.log('LISTA DE ORDERS', response.data)
        state.orders = response.data
      })
    } catch (error: any) {
      console.error(error.respose.data)
    }
  }
}

export default () => ({
  ...actions,
  ...getters,
  ...toRefs(state)
})
