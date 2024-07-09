<script setup lang="ts">
import { ref } from 'vue'
import RequestHelper, { authHost, authPort, userHost, userPort } from '@/utils/RequestHelper'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import { popNegative } from '@/scripts/Popups'
import { setupSocketServers } from '@/socket'
import { type Contact, ContactType } from 'common/dist/domain/core'
import { ContactFactory } from 'common/dist/domain/factories/ContactFactory'

const username = ref('')
const password = ref('')

const userStore = useUserStore()
const $q = useQuasar()

const login = () => {
  RequestHelper.post(`http://${authHost}:${authPort}/login`, {
    username: username.value,
    password: password.value
  })
    .then((res: any) => {
      userStore.isLoggedIn = true
      userStore.id = res.data.id.value
      userStore.username = res.data.username
      userStore.password = res.data.password
      userStore.role = res.data.role
      userStore.accessToken = res.data.accessToken
      userStore.refreshToken = res.data.refreshToken
      userStore.permissions = res.data.permissions
      RequestHelper.get(`http://${userHost}:${userPort}/${userStore.id}`).then((res: any) => {
        const contacts: Contact[] = []
        for (let i = 0; i < res.data.contacts.length; i++) {
          if (res.data.contacts[i].type === ContactType.EMAIL) {
            contacts.push(ContactFactory.createMailContact(res.data.contacts[i].value))
          } else if (res.data.contacts[i].type === ContactType.SMS) {
            contacts.push(ContactFactory.createSmsContact(res.data.contacts[i].value))
          }
        }
        userStore.name = res.data.name
        userStore.surname = res.data.surname
        userStore.mail = res.data.mail
        userStore.contacts = contacts
        if(res.data.username === "admin") {
          router.push('/admin')
        }
        setupSocketServers(userStore.accessToken)
        router.push('/home')
      })
    })
    .catch(() => {
      popNegative($q, 'Login failed')
      username.value = ''
      password.value = ''
    })
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
