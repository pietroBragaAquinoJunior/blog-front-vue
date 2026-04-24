<script setup lang="ts">
import  useUserStore  from '@/stores/userStore';

const { storeUser } = useUserStore();

</script>

<template>
  <main>
    <p>HOME!</p>
    <p>{{ storeUser }}</p>
  </main>
</template>

<style scoped>
</style>
