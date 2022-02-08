<template>
  <default-layout>
    <h1 class="title-page">{{product.name}}</h1>
    <div class="flex flex-col p-4 min-h-screen" v-if="!loading">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 border border-transparent rounded-md">
        <div class="flex w-full justify-center h-64 border border-stone-500 relative">
          image
          <button class="add-to-cart" @click.prevent="addItemToCart(product)">
            <icon-cart class="h-6"></icon-cart>
          </button>
        </div>
        <div class="h-50 bg-stone-500">
          <div
            class="bg-stone-700 font-bold text-lg text-stone-200 border-b border-stone-600 p-2"
          >{{product.name}}</div>
          <div class="bg-stone-600 text-right text-stone-400 px-2">{{product.name}}</div>
          <div class="bg-stone-500 p-2 text-stone-900">{{product.description}}</div>
          <div
            class="w-full bg-orange-400 inline-flex items-center justify-end px-2 py-1 font-bold text-lg"
          >{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}}</div>
        </div>
      </div>
      <div class="text-stone-100 font-semibold mt-2">
        <span>Comentários:</span>
        <div
          class="flex flex-col border-b border-orange-500 mt-2"
          v-for="item in 10"
          :key="item +1"
        >
          <div class="font-medium">
            Pedro cardoso
            <span class="badge-primary">22-02-2022</span>
          </div>
          <p
            class="text-xs"
          >Excelente produto sit amet consectetur adipisicing elit. Minus ipsam quod quibusdam sunt ab est, earum iure quaerat iste repellat illo! Totam quia modi consectetur libero repudiandae laboriosam eligendi veniam.</p>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onErrorCaptured, onMounted, PropType, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//components
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import IconCart from '../components/icons/IconCart.vue'
//types
import {IProductCategory} from '../types/products/productCategoryTypes'
//services
import useProduct from '../services/products/useProduct'
//store
import useCartState from '../store/useCartState'


export default defineComponent({
  name: 'ProductPage',
  components: {DefaultLayout, IconCart},
  props: {
    slug:{
      type: String as PropType<string>,
      required:true
    },
  },

  setup(props) {
    const route = useRoute()
    const {addItemToCart} = useCartState()
    const {state, product, getProductBySlug} = useProduct()

    watch(
      () => route.params.slug,
      async () => await getProductBySlug(props.slug)
    )
    getProductBySlug(props.slug)
    console.log('resultado de product', state.product)
    const buscar = () => getProductBySlug(props.slug)
    return {
      // product: <IProductCategory>state.product,
      product,
      loading: computed(()=>state.loading),
      addItemToCart,
      buscar
    }
  }
})
</script>

<style scoped>
  .add-to-cart {
    @apply absolute right-2 -bottom-2 flex items-center justify-center z-0;
    @apply h-10 w-10 md:w-12 md:h-12;
    @apply border-stone-800  bg-stone-500/30 rounded-full text-white;
    @apply hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:-translate-y-1;
    @apply transition duration-300 ease-in-out;
  }
</style>
