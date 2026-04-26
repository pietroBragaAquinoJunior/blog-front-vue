<script setup lang="ts">
import type { AxiosError } from 'axios'
import http from '../axios/http'
import { ref } from 'vue'
import type { ApiError } from '@/interfaces/ApiError'
import type { SuccessResponse } from '@/interfaces/SuccessResponse'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const title = ref('')
const description = ref('')
const published = ref(false)
const quill = ref(null);

const loading = ref(false)
const error = ref(null)

const resetForm = () => {
  title.value = ''
  description.value = ''
  published.value = false
}

const createPost = () => {
  loading.value = true
  error.value = null

  http.post('/posts', {
      title: title.value,
      description: description.value,
      // @ts-expect-error A ref quill não está tipada, só por isso ele está reclamando.
      html: quill.value.getHTML(),
      published: published.value,
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
    })
}
</script>

<template>
  <main>
    <div class="container-for-form">
      <form style="width: 80vw;" v-if="!loading" class="form" @submit.prevent="createPost">
        <p class="form-title">Criar Postagem</p>
        <p>Título: <input type="text" required v-model="title" /></p>
        <p>Descrição: <input type="text" required v-model="description" /></p>
        <QuillEditor ref="quill" style="min-height: 40vh; font-size: 18px;" toolbar="full" theme="snow" />
        <p>Publicar: <input type="checkbox" v-model="published" /></p>
        <button type="submit">Enviar</button>
      </form>
      <p v-else>Carregando...</p>
    </div>

  </main>
</template>

<style scoped></style>
