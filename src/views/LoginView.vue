<script setup lang="ts">

  import http from '../axios/http'
  import { ref } from 'vue';
  import useUserStore  from "../stores/userStore";
  import type { User } from '@/interfaces/User';

  const { setUser } = useUserStore();

  const email = ref('');
  const password = ref('');

  const loading = ref(false);
  const error = ref(null);

  const doLogin = () => {
    loading.value = true;
    error.value = null;

    http.post<User>('/auth/login', {
      email: email.value,
      password: password.value
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then(function (response) {
      setUser(response.data);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch(function (error) {

    })
    .finally(function () {

      loading.value = false;
    });
  }

</script>

<template>
  <main>
    <h2>Login!</h2>
    <form @submit.prevent="doLogin">
      <p>E-mail: <input type="text" required v-model="email" /></p>
      <p>Password: <input type="password" required v-model="password" /></p>
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<style scoped>
</style>
