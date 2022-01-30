<template>
  <Layout>
    <h1 class="py-4">Produtos</h1>
    {{ cartState }}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="relative border bg-slate-100 border-md shadow-md space-y-2"
      >
        <div
          class="object-contain h-52 bg-gradient-to-br from-sky-500 to-sky-400 rounded-t text-center"
        >image</div>
        <div class="p-4 flex flex-col">
          <button class="add-to-cart" @click="addItemToCart(product)">
            <font-awesome-icon icon="cart-plus" size="lg" />
          </button>
          <div class="text-lg font-semibold text-slate-600 truncate">{{ product.name }}</div>
          <div class="text-sm font-thin text-slate-600 mb-4">{{product.description}}</div>
          <div
            class="price"
          >{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}}</div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
// import productsGetAll from '@/services/products/productsGetAll'
// import useProductsState from '@/store/useProductsState'
import useCartState from '../store/useCartState'

export default defineComponent({
  name: 'Products',
  components: {DefaultLayout},

  setup(){
  // const {state} = useProductsState()
  const {state: cartState, addItemToCart} = useCartState()

  // async function getProducts() {
  //     const resp = await productsGetAll()

  //     console.log('Resposta Products Page:', resp)

  // }

  // getProducts()
  return {cartState, addItemToCart, products: []}
}
})
</script>

<style scoped>
  .add-to-cart {
    @apply absolute right-0 top-44 right-2 w-12 h-12 flex items-center justify-center;
    @apply border-sky-800  bg-sky-700 rounded-full text-white;
    @apply hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-500 hover:-translate-y-1;
    @apply transition duration-300 ease-in-out;
  }
  .price {
    @apply absolute inset-x-0 bottom-0 p-2;
    @apply flex flex-row items-center justify-end;
    @apply bg-slate-600 text-lg text-slate-50 font-bold;
  }
</style>
