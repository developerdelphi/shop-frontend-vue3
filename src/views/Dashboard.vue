<template>
  <DefaultLayout>
    <h1 class="title-page">Dashboard</h1>
    <div class="text-stone-100">{{ user }}</div>
  </DefaultLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import useUser from '../services/auth/useUser';

export default defineComponent({
  name: 'Dashboard',
  components: {DefaultLayout},

  setup() {
    const {getUser, user} = useUser()

    getUser()

    return {user}
  }
})
</script>
