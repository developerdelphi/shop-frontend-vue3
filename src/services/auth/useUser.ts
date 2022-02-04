import { reactive, toRefs } from 'vue'
import Api from '../api'

const state = reactive({
  user: {}
})

async function getUser() {
  try {
    await Api.get('api/user/').then(({ data }) => (state.user = data))
  } catch (error: any) {
    // console.error(error.response.data.errors)
  }
}

export default () => ({
  getUser,
  ...toRefs(state)
})
