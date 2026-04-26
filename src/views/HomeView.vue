<script setup lang="ts">
import useUserStore from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { storeUser } = storeToRefs(store)
</script>

<template>
  <main>
    <p>Início!</p>
    <p>{{ storeUser }}</p>
  </main>
</template>

<style scoped></style>
