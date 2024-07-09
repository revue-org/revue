<script setup lang="ts">
import {ref} from 'vue'
import {popNegative, popPositive} from '@/scripts/Popups'
import {useQuasar} from 'quasar'
import {HttpStatusCode} from "axios";
import RequestHelper, { authHost, authPort } from "@/utils/RequestHelper";
import type { User } from "@/domain/core/User";
import UserListElement from "@/components/admin/UserListElement.vue";

const $q = useQuasar()
const users = ref<User[]>([])

const getUsers = async (): Promise<void> => {
  const res = await RequestHelper.get(`http://${authHost}:${authPort}/users`).then((res: any) => {
    for (let i = 0; i < res.data.length; i++) {
      console.log(res.data[i])
    }
  })
/*  return res.data.map((user: any) => {
    return {
      id: user._id,
      name: user.name,
      surname: user.surname,
      role: user.role,
      username: user.username,
      phone: user.phone
    }
  })*/
}

const updateUsers = async () => {
  users.value = []
  const a: User[] = await getUsers()
  for (const user of a) {
    users.value.push(user)
  }
  console.log('users updated', users.value)
}
updateUsers()

const name = ref('')
const surname = ref('')
const role = ref('expert')
const username = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const addNewUser = () => {
  /*if (checkPasswordCorrectness()) {
    RequestHelper.post(`${httpProtocol}://${backendHost}:${backendPort}/users`, {
      name: name.value,
      surname: surname.value,
      role: role.value,
      username: username.value,
      phone: phone.value,
      password: password.value
    })
      .then((res: any) => {
        console.log(res)
        if (res.status === HttpStatusCode.Created) {
          popPositive($q, 'Utente creato con successo')
        }
        updateUsers()
      })
      .catch((e) => {
        popNegative($q, "Errore durante la creazione dell'utente")
      })
  } else {
    popNegative($q, 'Le password non corrispondono')
  }*/
}

const checkPasswordCorrectness = (): boolean => {
  return password.value === confirmPassword.value
}

const onReset = () => {
  name.value = ''
  surname.value = ''
  role.value = 'expert'
  username.value = ''
  phone.value = ''
  password.value = ''
  confirmPassword.value = ''
}

const deleteUser = (user: User) => {
/*  RequestHelper.delete(`${httpProtocol}://${backendHost}:${backendPort}/users/${user.id}`)
    .then((res: any) => {
      if (res.status === 200) {
        popPositive($q, 'Utente eliminato con successo')
      }
      updateUsers()
    })
    .catch((err: any) => {
      console.log(err)
    })*/
}
</script>

<template>
  <div class="container-video">
    <div class="new-user">
      <h2>Create new user</h2>
      <q-form @submit="addNewUser" @reset="onReset">
        <q-input
          v-model="name"
          label="Name"
          lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Name required']"
        />
        <q-input
          v-model="surname"
          label="Surname"
          lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Surname required']"
        />
        <q-input
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Username required']"
        />
        <q-input
          v-model="phone"
          type="number"
          label="Phone"
          lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Phone required']"
        />
        <q-input
          v-model="password"
          type="password"
          autocomplete
          label="Password"
          lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Password required']"
        />
        <q-input
          v-model="confirmPassword"
          type="password"
          autocomplete
          label="Confirm password"
          lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Password confirmation required']"
        />
        <div class="buttons">
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
          <q-btn label="Create" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>

    <div class="users-list">
      <h2>Users:</h2>
      <ol>
        <user-list-element
          v-for="user in users"
          :key="user.username"
          :user="user"
          @delete-user="deleteUser(user)"
          @get-users="getUsers"
        />
      </ol>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import 'src/assets/variables.scss';

.container-video {
  margin-top: $navbar-height;
  display: flex;
  justify-content: space-evenly;
  //align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .users-list {
    ol {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  }

  div.buttons,
  div.roles {
    margin: 10px;
  }
}
</style>
