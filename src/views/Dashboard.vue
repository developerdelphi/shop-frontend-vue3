<template>
  <DefaultLayout>
    <h1 class="title-page">Dashboard</h1>
  </DefaultLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
export default defineComponent({
  name: 'Dashboard',
  components: {DefaultLayout}
})
</script>
