<script setup lang="ts">
import http from '../axios/http'
import { ref } from 'vue'
import useUserStore from '../stores/userStore'
import type { User } from '@/interfaces/User'
import type { ApiError } from '@/interfaces/ApiError'
import { storeToRefs } from 'pinia'

const store = useUserStore()

const { storeUser } = storeToRefs(store)

const email = ref('')
const password = ref('')

const loading = ref(false)

const resetForm = () => {
  email.value = ''
  password.value = ''
}

const doLogin = () => {
  loading.value = true
  http.post<User>('/auth/login', {
      email: email.value,
      password: password.value,
    })
    .then(function (response) {
      store.setUser(response.data as User)
      resetForm()
      alert('Bem-Vindo, ' + storeUser.value.fullName + '!')
    })
    .catch(function (error) {
      const erroTratado: ApiError = error.response.data as ApiError
      alert(erroTratado.message)
    })
  .finally(function () {
    loading.value = false
  });
}
</script>

<template>
  <main>
    <div class="container-for-form">
      <form v-if="!loading" class="form" @submit.prevent="doLogin">
        <p class="form-title">Entrar</p>
        <p>E-mail: <input type="text" required v-model="email" /></p>
        <p>Senha: <input type="password" required v-model="password" /></p>
        <button type="submit">Enviar</button>
        <RouterLink style="padding-left: 20px" to="/reset-password-first">Esqueceu a senha?</RouterLink>
        <RouterLink style="padding-left: 20px" to="/signup">Não possui uma conta?</RouterLink>
      </form>
      <p v-else>Carregando...</p>
    </div>
  </main>
</template>

<style scoped></style>
