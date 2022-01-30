<template>
  <DefaultLayout>
    <div class="p-4 max-w-2xl mx-auto">
      <h1 class="title-page">Acessar minha conta</h1>
      <div class="mt-4 md:max-w-xl space-y-5">
        <div v-if="errors.message?.length" class="text-orange-400">
          <span>{{errors.message}}</span>
        </div>
        <div class>
          <input
            v-model="form.email"
            name="email"
            type="text"
            class="form-input input-login"
            placeholder="e-mail"
          />
          <div v-for="(error, index) in errors.email" :key="index" class="text-orange-400">
            <span>{{error}}</span>
          </div>
        </div>
        <div class>
          <input
            v-model="form.password"
            type="password"
            class="form-input input-login"
            placeholder="senha"
          />
          <div v-for="(error, index) in errors.password" :key="index" class="text-orange-400">
            <span>{{error}}</span>
          </div>
        </div>
        <div class="pt-5 border-t border-orange-500">
          <button @click="signIn()" class="btn-primary inline-block w-full">Acessar</button>
          <div class="flex flex-row justify-between text-sm text-stone-100 py-6 px-1">
            <a href="/" class="text-stone-400 hover:text-orange-500">Ainda não tenho cadastro</a>
            <a href="/" class="text-stone-400 hover:text-orange-500">Esqueci a senha</a>
          </div>
        </div>
      </div>
      <div class="text-white">{{ state }}</div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import {computed, reactive} from 'vue'
import {useRouter} from 'vue-router';
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import SignInRequest from '../services/auth/SignIn'
import useAuthState from '../store/auth/useAuthState';

const form = reactive({
  email : '',
  password : ''
})
const router = useRouter()
const {state, getErrors} = useAuthState()
const errors = getErrors()

async function signIn(){
  await SignInRequest({email: form.email, password: form.password}).then(resp => {
    if(state.isAuthenticated) router.push({name:'dashboard'})})
}
</script>
