<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { symSharpControlCamera } from '@quasar/extras/material-symbols-sharp'
import router from '@/router'
import { computed } from 'vue'

const routeName = computed(() => router.currentRoute.value.name)
const userStorage = useUserStore()
</script>

<template>
  <div>
    <nav>
      <q-icon :name="symSharpControlCamera" style="font-size: 1.5em" />
      <h1>Revue</h1>
      <q-separator dark vertical />
      <router-link to="/" :class="(routeName == 'Home') ? 'selected': ''">Home</router-link>
      <router-link to="/monitoring" :class="(routeName == 'Monitoring') ? 'selected': ''">Monitoring</router-link>
      <router-link to="/devices" :class="(routeName == 'Devices') ? 'selected': ''">Devices</router-link>
      <router-link to="/login" name="logout" @click="userStorage.logout()"
      >Logout
      </router-link
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
      box-sizing: border-box;
      position: relative;
      padding: 0.75em;

      &::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transform-origin: center;
      }

      &::before {
        border-bottom: 1px solid white;
        transform: scale3d(0, 1, 1);
      }

      &:hover::before, &.selected::before {
        transform: scale3d(1, 1, 1);
        transition: transform 200ms;
      }
    }

    a,
    h1 {
      color: white;
      text-decoration: none;
      padding: 0 2px;
      margin: 0 5px;

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
