<template>
  <DefaultLayout>
    <h1 class="title-page">Produtos</h1>
    <div v-if="loading" class="flex justify-center items-center h-screen w-full">
      <span class="animate-spin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-auto mt-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border bg-slate-100 border-md shadow-md space-y-2"
      >
        <div
          class="object-contain h-52 bg-gradient-to-br from-stone-500 to-stone-400 rounded-t text-center"
        >image</div>
        <div class="p-4 flex flex-col relative">
          <button class="add-to-cart" @click="addItemToCart(product)">
            <icon-cart class="h-6 w-6" />
          </button>
          <div class="text-lg font-semibold text-slate-600 truncate">{{ product.name }}</div>
          <div
            class="text-sm font-thin text-slate-600 mb-4 line-clamp-1 h-20"
          >{{product.description}}</div>
          <div
            class="price"
          >{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}}</div>
        </div>
      </div>

      <div v-if="loading" class="bg-stone-100 h-10 w-10"></div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
//components
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import IconCart from '../components/icons/IconCart.vue';
//Store
import useCartState from '../store/useCartState'
import useProductState from '../store/useProductState'
//services
import useProduct from '../services/products/useProduct';


export default defineComponent({
  name: 'Products',
  components: {DefaultLayout, IconCart},

  setup(){
    const {state} = useProductState()
    const {state: cartState, addItemToCart} = useCartState()

    const {getProducts, products, loading} = useProduct()

    getProducts();

    return {
      // products: computed(()=>state.products),
      products,
      // loading: computed(()=>state.loading),
      loading,
      addItemToCart
    }
  }
})
</script>

<style scoped>
  .add-to-cart {
    @apply absolute right-2 -inset-y-8 w-12 h-12 flex items-center justify-center z-0;
    @apply border-stone-800  bg-stone-700 rounded-full text-white;
    @apply hover:bg-gradient-to-r hover:from-stone-700 hover:to-stone-500 hover:-translate-y-1;
    @apply transition duration-300 ease-in-out;
  }
  .price {
    @apply absolute inset-x-0 bottom-0 p-2 z-0;
    @apply flex flex-row items-center justify-end;
    @apply bg-orange-600 text-lg text-orange-50 font-bold;
  }
</style>
