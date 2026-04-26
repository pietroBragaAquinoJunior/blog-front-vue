<script setup lang="ts">
import type { ApiError } from '@/interfaces/ApiError'
import http from '../axios/http'
import { ref } from 'vue'
import type { AxiosError } from 'axios'
import type { SuccessResponse } from '@/interfaces/SuccessResponse'

const email = ref('')
const fullName = ref('')
const password = ref('')

const loading = ref(false)

const resetForm = () => {
  email.value = ''
  fullName.value = ''
  password.value = ''
}

const doSignUp = () => {
  loading.value = true
  http.post('/auth/signup', {
      email: email.value,
      fullName: fullName.value,
      password: password.value,
    })
    .then(function (response) {
      resetForm()
      const responseTyped: SuccessResponse = response.data as SuccessResponse
      alert(responseTyped.message)
    })
    .catch(function (error: AxiosError) {
      if (error.response?.data) {
        const erroTratado: ApiError = error.response.data as ApiError
        alert(erroTratado.message)
      }
    })
  .finally(function () {
    loading.value = false
  });
}
</script>

<template>
  <main>
    <div class="container-for-form">
      <form v-if="!loading" class="form" @submit.prevent="doSignUp">
        <p class="form-title">Registrar</p>
        <p>E-mail: <input type="text" required v-model="email" /></p>
        <p>Nome Completo: <input type="text" required v-model="fullName" /></p>
        <p>Senha: <input type="password" required v-model="password" /></p>
        <button type="submit">Enviar</button>
        <RouterLink style="padding-left: 20px" to="/login">Já possui uma conta?</RouterLink>
      </form>
      <p v-else>Carregando...</p>
    </div>
  </main>
</template>

<style scoped></style>
