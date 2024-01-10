<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStorage = useUserStore()
const isLoginPage = computed(() => {
  return route.name === 'login'
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <input type="button" value="Logout" @click="userStorage.logout()" />
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import "src/assets/variables.scss";

header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $primary-color;
  padding: 10px;

  nav {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;

    a, input {
      background-color: transparent;
      color: white;
      text-decoration: none;
      padding: 5px 10px;

      &:hover {
        background-color: $secondary-color;
        border-radius: 5px;
      }
    }

    input {
      margin-left: auto;
      cursor: pointer;
      border: none;
    }

  }
}

</style>
