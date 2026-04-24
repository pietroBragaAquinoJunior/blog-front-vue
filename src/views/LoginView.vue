<script setup lang="ts">

  import http from '../axios/http'
  import { ref } from 'vue';
  import useUserStore  from "../stores/userStore";
  import type { User } from '@/interfaces/User';
  import router from '@/router';

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
    .then(function (response) {
      setUser(response.data);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch(function (error) {

    })
    .finally(function () {
      loading.value = false;
      // Reload the page so the menu bar can work accordingly.
      router.go(0);
    });
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
        </form>
    </div>
  </main>
</template>

<style scoped>
</style>
