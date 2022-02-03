<template>
  <div class="bg-stone-800 min-h-screen flex flex-col">
    <NavBar />
    <main class="p-2 flex-1">
      <slot />
    </main>
    <footer
      class="px-2 inset-x-0 bg-stone-900 bottom-0 text-sm py-1 flex flex-row justify-center left-0"
    >
      <p class="font-thin text-xs">
        <a href="https://beontheweb.com.br" target="_blank">Agência Be on the web</a> - All Rigths Reserveds &nbsp;2022
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import NavBar from '../nav/NavBar.vue'

export default {
  name: 'DefaultLayout',
  components: {NavBar}
}
</script>
