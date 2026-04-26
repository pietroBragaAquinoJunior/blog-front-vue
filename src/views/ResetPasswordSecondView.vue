<script setup lang="ts">
import http from '../axios/http'
import { ref } from 'vue'
import type { ApiError } from '@/interfaces/ApiError'
import type { SuccessResponse } from '@/interfaces/SuccessResponse'

const token = ref('')
const newPassword = ref('')
const againNewPassword = ref('')

const loading = ref(false)

const resetForm = () => {
  token.value = ''
  newPassword.value = ''
  againNewPassword.value = ''
}

const doResetPassword = () => {
  loading.value = true
  if (newPassword.value === againNewPassword.value) {
    http
      .post('/auth/reset-password', { token: token.value, newPassword: newPassword.value })
      .then(function (response) {
        resetForm()
        const success: SuccessResponse = response.data as SuccessResponse
        alert(success.message)
      })
      .catch(function (error) {
        const erroTratado: ApiError = error.response.data as ApiError
        alert(erroTratado.message)
      })
    .finally(function () {
      loading.value = false
    });
  } else {
    alert('As senhas não são iguais.')
  }
}
</script>

<template>
  <main>
    <div class="container-for-form">
      <form v-if="!loading" class="form" @submit.prevent="doResetPassword">
        <p class="form-title">Resetar senha [2]</p>
        <p>Token: <input type="text" required v-model="token" /></p>
        <p>Senha: <input type="password" required v-model="newPassword" /></p>
        <p>Digite novamente a senha: <input type="password" required v-model="againNewPassword" /></p>
        <button type="submit">Enviar</button>
        <RouterLink style="padding-left: 20px" to="/login">Já possui uma conta?</RouterLink>
        <RouterLink style="padding-left: 20px" to="/signup">Não possui uma conta?</RouterLink>
      </form>
      <p v-else>Carregando...</p>
    </div>
  </main>
</template>

<style scoped></style>
