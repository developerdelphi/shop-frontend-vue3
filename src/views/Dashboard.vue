<template>
  <DefaultLayout>
    <h1 class="title-page">Dashboard</h1>
    <div class="text-stone-100">{{ user }}</div>
    <hr />
    <div class="text-stone-100">
      <h2>Pedidos</h2>
      <div
        v-for="order in orders"
        :key="order.id"
        class="grid grid-cols-4 shadow border border-transparent p-2 card"
      >
        <div>Pedido: #{{ order.id }}</div>
        <div>{{ order.created_at }}</div>
        <div>Total: {{ new Intl.NumberFormat('pt-BR', {currency: 'BRL', style:'currency'}).format(order.total) }}</div>
        <div>Status: {{order.status }}</div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import useUser from '@/services/auth/useUser';

export default defineComponent({
  name: 'Dashboard',
  components: {DefaultLayout},

  setup() {
    const { getUser, requestOrders, getOrders, user } = useUser()

    getUser()

    getOrders()
    requestOrders()

    return { user, orders: getOrders() }
  }
})
</script>
