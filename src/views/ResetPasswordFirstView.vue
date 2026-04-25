<script setup lang="ts">

  import http from '../axios/http'
  import { ref } from 'vue';
  import type { ApiError } from '@/interfaces/ApiError';
  import type { SuccessResponse } from '@/interfaces/SuccessResponse';

  const email = ref('');
  const loading = ref(false);

  const resetForm = () => {
    email.value = ''
  }

  const doResetPassword = () => {
    loading.value = true;
    http.post('/auth/reset-password/email/'+email.value)
    .then(function (response) {
      resetForm()
      const success: SuccessResponse = response.data as SuccessResponse;
      alert(success.message)
    })
    .catch(function (error) {
      const erroTratado: ApiError = error.response.data as ApiError
      alert( erroTratado.message )
    })
    .finally(function () {
      loading.value = false;
    });
  }

</script>

<template>
  <main>
    <div class="container-for-form">
        <form v-if="!loading" class="form" @submit.prevent="doResetPassword">
          <p class="form-title">Reset Password [1]</p>
          <p>E-mail: <input type="text" required v-model="email" /></p>
          <button type="submit">Submit</button>
          <RouterLink style="padding-left: 20px;" to="/login">Already have an account?</RouterLink>
          <RouterLink style="padding-left: 20px;" to="/signup">Don't have an account?</RouterLink>
          <RouterLink style="padding-left: 20px;" to="/reset-password-second">Have token?</RouterLink>
        </form>
        <p v-else>Loading...</p>
    </div>
  </main>
</template>

<style scoped>
</style>
