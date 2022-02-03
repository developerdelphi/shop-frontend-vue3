<template>
  <nav class="flex flex-col sticky bg-stone-700 text-slate-100">
    <div class="flex flex-row justify-between items-center w-full p-2">
      <div class>
        <a href="http://localhost:3000/">
          <icon-brand class="h-8 w-8" />
        </a>
      </div>
      <div class="flex flex-1 justify-end pr-4">
        <router-link :to="{ name: 'cart' }">
          <div class="inline-flex">
            <icon-cart
              class="h-6 w-6 transform ease-in-out duration-200 hover:text-orange-500 hover:scale-105"
            />
            <span class="text-xl text-orange-400">{{ countItensCart() }}</span>
          </div>
        </router-link>
      </div>
      <div class="z-50">
        <span
          @click="toggleMenu = !toggleMenu"
          class="transform ease-in-out duration-300 hover:scale-110 hover:text-orange-500"
        >
          <icon-menu class="h-6 w-5" />
        </span>
      </div>
    </div>
    <div v-if="toggleMenu" class="menu-toggle">
      <router-link :to="{ name: 'signin' }" v-if="!isAuthenticated">Login</router-link>
      <div v-else class="text-right w-full">
        <div class="text-stone-500 font-semibold flex flex-col">
          <span>{{ user.name }}</span>
          <span class="text-sm">{{ user.email }}</span>
        </div>
        <div class="menu mt-2 pb-1 border-b border-stone-500/30 w-full">
          <a href="#">Sair</a>
        </div>
        <div class="menu flex flex-col w-full">
          <router-link :to="{ name: 'home' }">Home</router-link>
          <router-link :to="{ name: 'dashboard' }">Meus pedidos</router-link>
          <router-link :to="{ name: 'products' }">Produtos</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useAuthState from '../../store/auth/useAuthState';
import useCartState from '../../store/useCartState';

import IconCart from '../icons/IconCart.vue';
import IconBrand from '../icons/IconBrand.vue';
import IconMenu from '../icons/IconMenu.vue';

export default defineComponent({
  name: 'NavBar',
  components: { IconBrand, IconCart, IconMenu },

  setup() {
    const toggleMenu = ref<boolean>(false);

    const { isAuthenticated, state } = useAuthState();
    const { state: cartStore, countItensCart } = useCartState();

    return {
      toggleMenu,
      isAuthenticated,
      user: state.user,
      cartStore,
      countItensCart
    };
  }
});
</script>

<style scope>
  .menu-toggle {
    @apply flex flex-row justify-end bg-stone-400 w-3/4 md:w-1/2 right-0 absolute top-12 p-2 shadow-2xl shadow-orange-100/20 pr-4 text-lg;
  }
</style>
