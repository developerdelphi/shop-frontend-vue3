<template>
  <DefaultLayout>
    <h1 class="title-page">Produtos</h1>
    <div v-if="loading" class="flex justify-center items-center h-screen w-full animate-pulse">
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
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 z-auto mt-4 px-2">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-slate-100 rounded-md border border-transparent shadow-md space-y-2"
        @click.prevent="show(product.slug)"
      >
        <div
          class="object-contain h-52 bg-gradient-to-br from-stone-500 to-stone-400 rounded-t text-center"
        >image</div>
        <div class="relative flex flex-col">
          <button class="add-to-cart" @click="addItemToCart(product)">
            <icon-cart class="h-6 w-6" />
          </button>
          <div class="grid grid-cols-1 gap-0 place-content-stretch">
            <div
              class="md:text-lg font-semibold text-slate-600 px-2 py-1 truncate border-b border-stone-200"
            >{{ product.name }}</div>
            <div class="text-sm text-right font-thin text-slate-600 mb-4 line-clamp-2 px-1">
              <b>Categoria:</b>
              {{product.category.name}}
            </div>
            <div
              class="price"
            >{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}}</div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="bg-stone-100 h-10 w-10"></div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
//components
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import IconCart from '../components/icons/IconCart.vue';
//Store
import useCartState from '../store/useCartState'
// import useProductState from '../store/useProductState'
//services
import useProduct from '../services/products/useProduct';
import router from '../router';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'Products',
  components: {DefaultLayout, IconCart},

  setup(){
    // const {state} = useProductState()
    const {state: cartState, addItemToCart} = useCartState()
    const router = useRouter()

    const {findBySlug, getProducts, products, state} = useProduct()

    getProducts();

    const show = (slug:string) => {
      router.push({name:'product', params: {slug}})
    }

    return {
      // products: computed(()=>state.products),
      // products: computed(()=>state.products),
      // loading: computed(()=>state.loading),
      loading: computed(()=>state.loading),
      addItemToCart,
      show,
      products
    }
  }
})
</script>

<style scoped>
  .add-to-cart {
    @apply absolute right-2 -inset-y-9 flex items-center justify-center z-0;
    @apply h-10 w-10 md:w-12 md:h-12;
    @apply border-stone-800  bg-stone-500/30 rounded-full text-white;
    @apply hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:-translate-y-1;
    @apply transition duration-300 ease-in-out;
  }
  .price {
    @apply bottom-0 left-0 p-2 w-full rounded-b;
    @apply flex flex-row items-center justify-end;
    @apply bg-orange-500 text-lg text-orange-50 font-bold;
  }
</style>
