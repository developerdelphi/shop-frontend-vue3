<template>
  <DefaultLayout>
    <div class="p-4 max-w-2xl mx-auto">
      <h1 class="title-page">Acessar minha conta</h1>
      <div class="mt-4 md:max-w-xl space-y-5">
        <div class>
          <input
            v-model="form.email"
            name="email"
            type="text"
            class="form-input input-login"
            placeholder="e-mail"
          />
        </div>
        <div class>
          <input
            v-model="form.password"
            type="password"
            class="form-input input-login"
            placeholder="senha"
          />
        </div>
        <div class="pt-5 border-t border-orange-500">
          <button @click="signIn()" class="btn-primary inline-block w-full">Acessar</button>
          <div class="flex flex-row justify-between text-sm text-stone-100 py-6 px-1">
            <a href class="text-stone-400 hover:text-orange-500">Ainda não tenho cadastro</a>
            <a href class="text-stone-400 hover:text-orange-500">Esqueci a senha</a>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import SignInRequest from '../services/auth/SignIn'

const form = reactive({
  email : '',
  password : ''
})

async function signIn(){
  // console.log(form)
  await SignInRequest({email: form.email, password: form.password})
}
</script>
