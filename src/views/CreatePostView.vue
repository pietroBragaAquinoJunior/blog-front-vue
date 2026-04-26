<script setup lang="ts">
import type { AxiosError } from 'axios'
import http from '../axios/http'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { ApiError } from '@/interfaces/ApiError'
import type { SuccessResponse } from '@/interfaces/SuccessResponse'

import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Dropcursor } from '@tiptap/extensions'
import { Editor, EditorContent } from '@tiptap/vue-3'

const title = ref('')
const description = ref('')
const published = ref(false)
// const quill = ref(null);

const loading = ref(false)
const error = ref(null)

const resetForm = () => {
  title.value = ''
  description.value = ''
  editor.value?.commands.clearContent()
  published.value = false
}

const createPost = () => {
  loading.value = true
  error.value = null

  http.post('/posts', {
    title: title.value,
    description: description.value,
    html: editor.value?.getHTML(),
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

//https://tiptap.dev/docs/editor/getting-started/install/vue3
//https://tiptap.dev/docs/editor/extensions/nodes/image
const imageConfiguration = Image.configure({
  allowBase64: true,
  resize: {
    enabled: true,
    alwaysPreserveAspectRatio: true
  }
})
const editor = ref<Editor | undefined>();

onMounted(() => {
  editor.value = new Editor({
    extensions: [Document, Paragraph, Text, imageConfiguration, Dropcursor],
    content: ``,
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy();
})
</script>

<template>
  <main>
    <div class="container-for-form">
      <form style="width: 80vw;" v-if="!loading" class="form" @submit.prevent="createPost">
        <p class="form-title">Criar Postagem</p>
        <p>Título: <input type="text" required v-model="title" /></p>
        <p>Descrição: <input type="text" required v-model="description" /></p>
        <p>Conteúdo: <editor-content style="border: 1px solid black;" :editor="editor" /></p>
        <p>Publicar: <input type="checkbox" v-model="published" /></p>
        <button type="submit">Enviar</button>
      </form>
      <p v-else>Carregando...</p>
    </div>

  </main>
</template>

<style scoped></style>
