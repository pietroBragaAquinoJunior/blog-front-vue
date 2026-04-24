<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import useUserStore from './stores/userStore';

const { storeUser } = useUserStore();

</script>

<template>
  <header>
    <div>
      <nav>
        <div class="menu">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink v-if="storeUser.authorities.find(item => item.authority == 'CAN_CREATE_POST')" to="/create-post">Create New Post</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <!-- Recebo a informação de que devo atualizar da tela de login -->
  <RouterView />
</template>

<style scoped>
.menu{
  height: 75px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
.menu a{
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
}
</style>
