<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const username = ref('')
const password = ref('')
</script>

<template>
  <div>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="useUserStore().login()">
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
