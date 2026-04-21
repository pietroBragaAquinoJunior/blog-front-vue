<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { VueCookies } from 'vue-cookies'
import { inject } from 'vue';
const $cookies = inject<VueCookies>('$cookies');
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="menu">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/create-post">Create Post</RouterLink>
        </div>
      </nav>
      {{ $cookies }}
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.menu{
  height: 75px;
  background-color: blue;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.menu a{
  color: white;
  text-decoration: none;
  font-size: 25px;
}
</style>
