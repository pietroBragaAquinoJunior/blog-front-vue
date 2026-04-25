<script setup lang="ts">

  import type { ApiError } from '@/interfaces/ApiError';
import http from '../axios/http'
  import { ref } from 'vue';
import type { AxiosError } from 'axios';

  const email = ref('');
  const fullName = ref('');
  const password = ref('');

  const error = ref(null);

  const resetForm = () => {
    email.value = ''
    fullName.value = ''
    password.value = ''
  }

  const doLogin = () => {

    error.value = null

    http.post('/auth/signup', {
      email: email.value,
      fullName: fullName.value,
      password: password.value
    })
    .then(function () {
      resetForm()
      alert('Usuário criado com sucesso!')
    })
    .catch(function (error: AxiosError) {
      if(error.response?.data){
        const erroTratado: ApiError = error.response.data as ApiError
        alert( erroTratado.message )
      }
    })
    // .finally(function () {

    // });
  }

</script>

<template>
  <main>
    <div class="container-for-form">
        <form class="form" @submit.prevent="doLogin">
          <p class="form-title">Sign Up</p>
          <p>E-mail: <input type="text" required v-model="email" /></p>
          <p>Full Name: <input type="text" required v-model="fullName" /></p>
          <p>Password: <input type="password" required v-model="password" /></p>
          <button type="submit">Submit</button>
        </form>
    </div>
  </main>
</template>

<style scoped>
</style>
