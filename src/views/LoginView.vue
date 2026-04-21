<script setup lang="ts">

  import http from '../axios/http'
  import { ref } from 'vue';

  const login = ref('');
  const password = ref('');

  const loading = ref(false);
  const error = ref(null);

  const doLogin = () => {
    loading.value = true;
    error.value = null;

    http.post('/auth/login', {
      login: login.value,
      password: password.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
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
      <p>Login: <input type="text" required v-model="login" /></p>
      <p>Password: <input type="password" required v-model="password" /></p>
      <button type="submit">Create Post!</button>
    </form>
  </main>
</template>

<style scoped>
</style>
