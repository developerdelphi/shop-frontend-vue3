import useCartState from '../../store/useCartState'
import Api from '../api'

type OrderSaveTypes = {
  total: number
}

const cartState = useCartState()

async function saveOrder(data: OrderSaveTypes) {
  try {
    await Api.post('api/orders', data).then(response => {
      // console.log(response.data);
      cartState.reset()
    })
  } catch (error: any) {
    console.error(error.response)
  }
}

export { saveOrder }
