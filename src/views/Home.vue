<template>
  <DefaultLayout>
    <h1 class="title-page">Home page</h1>
    <h1>Home page</h1>
    <h2>Home page</h2>
    <h3>Home page</h3>
    <h4>Home page</h4>
    <div class="p-4 space-y-2">
      <p class="line-clamp-1">
        Lorem ipsum dolor
        sof seeed consectetur adipisicing elit. Quia sunt veniam assumenda facere! Quidem reprehenderit dicta, dolore ad laudantium eaque minus quisquam alias, accusantium, quam perspiciatis praesentium quibusdam animi nam.
      </p>
      <div>
        <span class="badge-primary">Primary</span>
        <span class="badge-active">active</span>
        <span class="badge-inactive">inactive</span>
        <span class="badge-secondary">secondary</span>
      </div>
      <br />
      <div class="card div-exemplo">
        <button class="btn-primary inline-block w-full">Primary</button>
        <button class="btn-secondary">Secondary</button>
        <a href="#" class="btn-primary">Link primary</a>
        <a href="#" class="btn-secondary">Link secondary</a>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../components/layouts/DefaultLayout.vue'

</script>

<style scope>
  .div-exemplo {
    @apply flex flex-row flex-wrap justify-between space-x-2 space-y-3;
  }
</style>
