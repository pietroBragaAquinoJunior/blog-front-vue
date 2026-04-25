<script setup lang="ts">

  import http from '../axios/http'
  import { ref } from 'vue';
  import type { ApiError } from '@/interfaces/ApiError';
  import type { SuccessResponse } from '@/interfaces/SuccessResponse';

  const token = ref('');
  const newPassword = ref('');
  const againNewPassword = ref('');

  const resetForm = () => {
    token.value = ''
    newPassword.value = ''
    againNewPassword.value = ''
  }

  const doResetPassword = () => {
    if(newPassword.value === againNewPassword.value){
      http.post('/auth/reset-password', {token: token.value, newPassword: newPassword.value})
      .then(function (response) {
        resetForm()
        const success : SuccessResponse = response.data as SuccessResponse;
        alert(success.message)
      })
      .catch(function (error) {
          const erroTratado: ApiError = error.response.data as ApiError
          alert( erroTratado.message )
      })
      // .finally(function () {

      // });
    } else{
      alert('As senhas não são iguais.')
    }
  }

</script>

<template>
  <main>
    <div class="container-for-form">
        <form class="form" @submit.prevent="doResetPassword">
          <p class="form-title">Reset Password [2]</p>
          <p>Token: <input type="text" required v-model="token" /></p>
          <p>Password: <input type="password" required v-model="newPassword" /></p>
          <p>Enter again Password: <input type="password" required v-model="againNewPassword" /></p>
          <button type="submit">Submit</button>
          <RouterLink style="padding-left: 20px;" to="/login">Already have an account?</RouterLink>
          <RouterLink style="padding-left: 20px;" to="/signup">Don't have an account?</RouterLink>
        </form>
    </div>
  </main>
</template>

<style scoped>
</style>
