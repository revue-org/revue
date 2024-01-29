<script setup lang="ts">
import { ref } from 'vue'
import RequestHelper, { authHost, authPort } from '@/utils/RequestHelper'
import { HttpStatusCode as AxiosHttpStatusCode } from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const username = ref('')
const password = ref('')

const userStore = useUserStore()

const login = () => {
  RequestHelper.post(`http://${authHost}:${authPort}/login`, {
    username: username.value,
    password: password.value
  }).then((res): void => {
    if (res.status == AxiosHttpStatusCode.Ok) {
      userStore.username = username.value
      userStore.accessToken = res.data.accessToken
      userStore.refreshToken = res.data.refreshToken
      userStore.isLoggedIn = true
      router.push('/home')
    } else {
      console.log(`Login failed with status code ${res.status} and message ${res.data.message}`)
    }
  })
    .catch((err): void => console.log(err))

}

</script>

<template>
  <div>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login()">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" autocomplete="true" required />
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" autocomplete="true" required />
        <q-btn color="secondary" type="submit">Login</q-btn>
      </form>
    </div>
  </div>
</template>

<style scoped>
div {
  height: 100vh;

  /* Add your component-specific styles here */

  .login-container {
    max-width: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: -50px auto auto;
  }

  h1 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label {
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
}
</style>
