<template>
  <DefaultLayout>
    <h1 class="title-page">Minhas compras</h1>
    <div class="md:flex md:flex-row space-y-4 md:space-y-0 md:gap-2">
      <div class="md:basis-8/12">
        <h2 class="title">Produtos</h2>
        <div v-for="item in items" :key="item.id" class="flex flex-col items-center w-full">
          <div
            class="flex px-2 py-2 border border-stone-400 rounded mb-1 bg-stone-400 w-full shadow"
          >
            <div class="flex-1 items-center py-2">{{item.name}}</div>
            <div class="inline-flex items-center text-stone-600">
              <button class="p-1" @click="addItemToCart(item)">
                <icon-plus class="h-5 w-5" />
              </button>
              <span
                class="rounded-full px-2 py-0 border border-orange-400 bg-orange-400 text-stone-800"
              >{{item.quantity}}</span>
              <button class="p-1" @click="decItemCart(item.id)">
                <icon-minus class="h-5 w-5" />
              </button>
            </div>
            <div
              class="px-2 inline-flex items-center text-lg"
            >{{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price) }}</div>
            <div>
              <button class="p-1 text-sky-400">
                <font-awesome-icon icon="trash-alt" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between w-full bg-orange-400 p-1 text-stone-900">
          <span class="text-lg font-semibold">Total</span>
          <span
            class="font-bold text-xl"
          >{{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(total) }}</span>
        </div>
      </div>
      <div class="md:basis-4/12">
        <h2 class="title">Informações Pessoais</h2>
        <div class="p-2 bg-stone-500">
          <div>
            Nome:
            <span>Fulano de tal</span>
          </div>
          <div>
            E-mail:
            <span>fulano@mail.com</span>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
//components
import DefaultLayout from '../components/layouts/DefaultLayout.vue';
import IconMinus from '../components/icons/IconMinus.vue';
import IconPlus from '../components/icons/IconPlus.vue';
import IconTrash from '../components/icons/IconTrash.vue';
//store
import useCartState from '../store/useCartState'

export default defineComponent({
  name: 'CartPage',
  components: {DefaultLayout, IconPlus, IconMinus, IconTrash},

  setup() {
    const {decItemCart, addItemToCart, getItems, getTotal,} = useCartState();

    return {
      items: getItems(),
      decItemCart,
      addItemToCart,
      total: getTotal
    }
  }
});
</script>

<style>
</style>
