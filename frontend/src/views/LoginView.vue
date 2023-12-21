<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");

function login() {
  console.log("login");
  console.log(username.value);
  console.log(password.value);
  // POST request to /api/login
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input
        type="text"
        v-model="username"
        id="username"
        autocomplete="true"
        required
      />

      <label for="password">Password:</label>
      <input
        type="password"
        v-model="password"
        id="password"
        autocomplete="true"
        required
      />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
/* Add your component-specific styles here */
.login-container {
  max-width: 300px;
  margin: auto;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

form input {
  width: 250px;
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
</style>
