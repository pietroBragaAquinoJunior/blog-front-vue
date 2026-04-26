<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import useUserStore from './stores/userStore'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { storeUser } = storeToRefs(store)
</script>

<template>
  <header>
    <div>
      <nav>
        <div class="menu">
          <RouterLink to="/">Início</RouterLink>
          <RouterLink to="/explore">Explorar</RouterLink>
          <RouterLink to="/signup">Registrar</RouterLink>
          <RouterLink to="/login">Entrar</RouterLink>
          <RouterLink
            v-if="!!storeUser.authorities.find((item) => item.authority == 'CAN_CREATE_POST')"
            to="/create-post">Criar Postagem</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.menu {
  height: 75px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.menu a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
}
</style>
