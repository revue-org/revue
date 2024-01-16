<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { symSharpControlCamera } from "@quasar/extras/material-symbols-sharp";

const userStorage = useUserStore();
</script>

<template>
  <div>
    <nav>
      <q-icon :name="symSharpControlCamera" style="font-size: 1.5em" />
      <h1>Revue</h1>
      <q-separator dark vertical />
      <router-link to="/">Home</router-link>
      <router-link to="/monitoring">Monitoring</router-link>
      <router-link to="/login" name="logout" @click="userStorage.logout()"
        >Logout</router-link
      >
      <q-btn flat @click="$emit('toggle-aside')" round dense icon="menu" />
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/variables.scss";

h1 {
  all: unset;
  font-size: 18px;
}

div {
  width: 100%;
  background-color: $primary-color;
  padding: 10px;

  nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.3rem;

    a {
      font-size: 16px;
    }

    a,
    h1 {
      color: white;
      text-decoration: none;
      padding: 0 5px;

      &[name="logout"] {
        margin-left: auto;
      }

      &:hover {
        background-color: transparent;
        border-radius: 5px;
      }
    }
  }
}
</style>
