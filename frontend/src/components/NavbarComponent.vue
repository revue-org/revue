<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStorage = useUserStore();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login" name="logout" @click="userStorage.logout()"
        >Logout</RouterLink
      >
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

    a {
      color: white;
      text-decoration: none;
      padding: 5px 10px;

      &[name="logout"] {
        margin-left: auto;
      }

      &:hover {
        background-color: $secondary-color;
        border-radius: 5px;
      }
    }
  }
}
</style>
