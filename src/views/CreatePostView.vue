<script setup lang="ts">
  import http from '../axios/http'
  import { ref } from 'vue';

  const title = ref('');
  const description = ref('');
  const html = ref('');
  const published = ref(false);

  const loading = ref(false);
  const error = ref(null);

  const createPost = () => {
    loading.value = true;
    error.value = null;

    http.post('/posts', {
      title: title.value,
      description: description.value,
      html: html.value,
      published: published.value
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
    <div class="container-for-form">
        <form class="form" @submit.prevent="createPost">
          <p class="form-title">Create New Post</p>
          <p>Title: <input type="text" required v-model="title" /></p>
          <p>Description: <input type="text" required v-model="description" /></p>
          <p>Html: <input type="text" required v-model="html" /></p>
          <p>Published: <input type="checkbox" v-model="published" /></p>
          <button type="submit">Submit</button>
        </form>
    </div>
  </main>
</template>

<style scoped>
</style>
