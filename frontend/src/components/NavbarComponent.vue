<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { symSharpControlCamera } from '@quasar/extras/material-symbols-sharp'
import router from '@/router'
import { computed, ref } from 'vue'
import RequestHelper, { authHost, authPort } from '@/utils/RequestHelper'
import { HttpStatusCode as AxiosHttpStatusCode } from 'axios'
import { useUserStore } from '@/stores/user'
import { closeSocketServers } from '@/socket'

const routeName = computed(() => router.currentRoute.value.name)
const navbarExpanded = ref(false)

const userStore = useUserStore()
const logout = () => {
  RequestHelper.post(`http://${authHost}:${authPort}/logout`, {
    username: userStore.username
  }).then((res): void => {
    if (res.status == AxiosHttpStatusCode.Ok) {
      useUserStore().clearFields()
      closeSocketServers()
      router.push('/login')
    } else {
      console.log(`Logout failed with status code ${res.status} and message ${res.data.message}`)
    }
  })
}
</script>

<template>
  <nav :class="navbarExpanded ? 'expanded' : ''">
    <div class="title">
      <q-icon :name="symSharpControlCamera" style="font-size: 1.5em" />
      <h1>Revue</h1>
      <q-btn class="menu" flat @click="navbarExpanded = !navbarExpanded" round dense icon="menu" />
    </div>
    <router-link to="/" :class="routeName == 'Home' ? 'selected home' : 'home'">Home</router-link>
    <router-link to="/monitoring" :class="routeName == 'Monitoring' ? 'selected' : ''"
      >Monitoring
    </router-link>
    <router-link to="/devices" :class="routeName == 'Devices' ? 'selected' : ''">Devices</router-link>
    <router-link to="/alarms" :class="routeName == 'Alarms' ? 'selected' : ''">Alarms</router-link>
    <router-link to="/notifications" :class="routeName == 'Notifications' ? 'selected' : ''"
      >Notifications
    </router-link>
    <router-link to="/history" :class="routeName == 'History' ? 'selected' : ''">History</router-link>
    <router-link to="/login" class="logout" @click="logout()">Logout</router-link>
  </nav>
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

nav {
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;
  max-height: 50px;
  overflow: hidden;
  transition: max-height 200ms linear;

  &.expanded {
    max-height: 300px;
  }

  background-color: $primary-color;
  padding: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.3rem;

  div.title {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: white;

    h1 {
      all: unset;
      margin-right: auto;
      font-size: 18px;
    }
  }

  button.menu {
    display: none;
    color: white;
  }

  .home,
  .logout {
    margin-left: auto !important;
  }

  a {
    font-size: 16px;
    box-sizing: border-box;
    position: relative;
    color: white;
    text-decoration: none;
    padding: 1px 5px;
    margin: 0 5px;

    &:hover {
      background-color: transparent;
      border-radius: 5px;
    }

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

    &:hover::before,
    &.selected::before {
      transform: scale3d(1, 1, 1);
      transition: transform 200ms;
    }
  }
}

@media screen and (max-width: 700px) {
  nav {
    flex-direction: column;

    div.title {
      width: 100%;
    }

    .home,
    .logout {
      margin-left: unset !important;
    }

    button.menu {
      display: inline-flex;
    }

    .selected {
      display: block !important;
    }
  }
}
</style>
