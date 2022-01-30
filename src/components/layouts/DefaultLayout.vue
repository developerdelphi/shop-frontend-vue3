<template>
  <div class="bg-stone-800 min-h-screen flex flex-col">
    <NavBar />
    <main class="p-2">
      <slot />
    </main>
    <footer
      class="absolute px-2 inset-x-0 bg-stone-900 bottom-0 text-sm py-1 flex flex-row justify-center"
    >
      <p class="font-thin text-xs">Agência Be on the web - All Rigths Reserveds &nbsp;2022</p>
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
