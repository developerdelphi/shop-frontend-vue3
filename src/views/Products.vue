<template>
  <DefaultLayout>
    <h1 class="title-page">Produtos</h1>
    <div class="p-2">
      <div class="inline-flex space-x-1">
        <input
          class="rounded-md text-sm font-semibold border border-transparent focus:ring-orange-500 placeholder:text-stone-500/30"
          type="text"
          placeholder="Pesquisar por..."
        />
        <button class="btn-search">
          <icon-search class="h-6" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-auto mt-4 px-2">
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
            <div class="text-sm text-right font-thin text-slate-600 mb-4 truncate px-1">
              <b>Categoria:</b>
              {{product.category.name}}
            </div>
            <div
              class="price"
            >{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center w-full py-4 animate-pulse">
      <span class="animate-spin">
        <icon-loading />
      </span>
    </div>
    <div v-if="nextPage" class="flex justify-center items-center py-8">
      <button class="btn-primary" @click="paginate('next')">Mais produtos...</button>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
//components
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import IconCart from '../components/icons/IconCart.vue';
import IconSearch from '../components/icons/IconSearch.vue';
import IconLoading from '../components/icons/IconLoading.vue';
//Store
import useCartState from '../store/useCartState'
//services
import useProduct from '../services/products/useProduct';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'Products',
  components: {DefaultLayout, IconCart, IconSearch, IconLoading},

  setup(){

    const { addItemToCart} = useCartState()
    const router = useRouter()

    const {getProducts, paginate, products, state, nextPage} = useProduct()

    getProducts();

    const show = (slug:string) => {
      router.push({name:'product', params: {slug}})
    }

    window.onscroll = () => {
      let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight + 10) >= document.documentElement.offsetHeight;
      // console.log('SCROLLTOP', document.documentElement.scrollTop +10);
      // console.log('CLIENT HEIGHT', window.innerHeight);
      // console.log('OFFSET', document.documentElement.offsetHeight);
      // console.log('comparação', document.documentElement.scrollTop + window.innerHeight);
      if(bottomOfWindow) {
        // console.log('CHAMOU')
        if(nextPage.value) paginate('next')
      }
    }

    return {
      loading: computed(()=>state.loading),
      addItemToCart,
      show,
      paginate,
      products,
      nextPage
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

  .btn-search {
    @apply appearance-none cursor-pointer px-4 py-2 rounded-md tracking-tight;
    @apply font-semibold;
    @apply transition duration-300 ease-in-out;
    @apply hover:scale-105 hover:bg-stone-400;
    @apply focus:ring;
    @apply bg-stone-500;
  }
</style>
