<template>
  <nav class="flex flex-col sticky bg-stone-700 text-slate-100">
    <div class="flex flex-row justify-between items-center w-full p-2">
      <div class>
        <a href="http://localhost:3000/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <div>{{ user}}</div>
      <div>
        <span
          @click="toggleMenu = !toggleMenu"
          class="transform ease-in-out duration-300 hover:scale-110 hover:text-orange-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
    <div
      v-if="toggleMenu"
      class="flex flex-row justify-end bg-stone-400 w-3/4 right-0 absolute top-12 p-2 shadow-2xl shadow-slate-400 pr-4 text-lg"
    >
      <router-link :to="{name: 'signin'}" v-if="!isAuthenticated">Login</router-link>
      <div v-else class="text-right w-full">
        <div class="text-stone-500 font-semibold flex flex-col">
          <span>{{ user.name }}</span>
          <span class="text-sm">{{ user.email }}</span>
        </div>
        <div class="hover:text-stone-800 mt-2 border-b border-stone-500/30 w-full">Sair</div>
        <div class="menu flex flex-col w-full">
          <router-link :to="{name: 'home'}">Home</router-link>
          <router-link :to="{name: 'dashboard'}">Meus pedidos</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useAuthState from '../../store/auth/useAuthState';

export default defineComponent({
  name: 'NavBar',

  setup() {
    const toggleMenu = ref<boolean>(false)

    const {isAuthenticated, state} = useAuthState()

    return {toggleMenu, isAuthenticated, user: state.user}
  }
})
</script>
