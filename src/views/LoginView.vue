<script setup lang="ts">

  import http from '../axios/http'
  import { ref } from 'vue';
  import useUserStore  from "../stores/userStore";
  import type { User } from '@/interfaces/User';
  import type { ApiError } from '@/interfaces/ApiError';
  import { storeToRefs } from 'pinia';

  const store = useUserStore();

  const {storeUser} = storeToRefs(store)

  const email = ref('');
  const password = ref('');

  const resetForm = () => {
    email.value = ''
    password.value = ''
  }

  const doLogin = () => {

    http.post<User>('/auth/login', {
      email: email.value,
      password: password.value
    })
    .then(function (response) {
      store.setUser(response.data);
      resetForm()
      alert('Bem-Vindo, ' + storeUser.value.fullName + "!")
    })
    .catch(function (error) {
        const erroTratado: ApiError = error.response.data as ApiError
        alert( erroTratado.message )
    })
    // .finally(function () {

    // });
  }

</script>

<template>
  <main>
    <div class="container-for-form">
        <form class="form" @submit.prevent="doLogin">
          <p class="form-title">Login</p>
          <p>E-mail: <input type="text" required v-model="email" /></p>
          <p>Password: <input type="password" required v-model="password" /></p>
          <button type="submit">Submit</button>
          <RouterLink style="padding-left: 20px;" to="/reset-password-first">Need help with your password?</RouterLink>
          <RouterLink style="padding-left: 20px;" to="/signup">Don't have an account?</RouterLink>
        </form>
    </div>
  </main>
</template>

<style scoped>
</style>
