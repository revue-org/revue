<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import RequestHelper, { authHost, authPort, userHost, userPort } from '@/utils/RequestHelper'
import type { User } from '@/domain/core/User'
import UserListElement from '@/components/admin/UserListElement.vue'
import { useUserStore } from '@/stores/user'
import type { Contact } from 'common/dist/domain/core'
import { popNegative, popPositive } from '@/scripts/Popups'

const $q = useQuasar()
const users = ref<User[]>([])

const name = ref('')
const surname = ref('')
const mail = ref('')
const contacts = ref<Contact[]>([])
const permissions = ref<string[]>([])
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const getUsers = async (): Promise<void> => {
  await RequestHelper.get(`http://${authHost}:${authPort}/users`).then((access: any) => {
    users.value = []
    for (let i = 0; i < access.data.length; i++) {
      console.log(access.data[i])
      RequestHelper.get(`http://${userHost}:${userPort}/${access.data[i].id.value}`).then((registry: any) => {
        console.log(registry.data)
        users.value.push({
          id: registry.data.id.value,
          username: access.data[i].username,
          role: access.data[i].role,
          permissions: access.data[i].permissions,
          name: registry.data.name,
          surname: registry.data.surname,
          mail: registry.data.mail,
          contacts: registry.data.contacts
        })
      })
    }
  })
}

const addNewUser = () => {
  if (checkPasswordCorrectness()) {
    let newPermissions: string[] = permissions.value.map((permission: any) => {
      return permission.value
    })
    let newContacts: Contact[] = contacts.value.map((contact: any) => {
      return {
        type: contact.label.split(':')[0],
        value: contact.value
      }
    })
    RequestHelper.post(`http://${authHost}:${authPort}/users`, {
      username: username.value,
      password: password.value,
      permissions: newPermissions
    })
      .then((userId: any) => {
        console.log(userId.data)
        RequestHelper.post(`http://${userHost}:${userPort}/`, {
          id: userId.data.value,
          name: name.value,
          surname: surname.value,
          mail: mail.value,
          contacts: newContacts
        })
          .then((res: any) => {
            console.log(res)
            getUsers()
            popPositive($q, 'User created successfully')
          })
          .catch(e => {
            console.log(e)
            popNegative($q, 'Error while creating user')
          })
      })
      .catch(e => {
        console.log(e)
        popNegative($q, 'Error while creating user')
      })
  } else {
    popNegative($q, 'Passwords mismatch')
  }
}

const checkPasswordCorrectness = (): boolean => {
  return password.value === confirmPassword.value
}

const optionsPermissions: ref<{ label: string; value: string }> = ref([])
const getPermissions = async () => {
  const permissions = useUserStore().permissions
  for (let i = 0; i < permissions.length; i++) {
    optionsPermissions.value.push({
      label: 'Room: ' + permissions[i],
      value: permissions[i]
    })
  }
}

const optionsContacts: ref<{ label: string; value: string }> = ref([])
const getContacts = async () => {
  useUserStore().contacts.forEach((contact: Contact) => {
    optionsContacts.value.push({
      label: contact.type + ': ' + contact.value,
      value: contact.value
    })
  })
}

const onReset = () => {
  name.value = ''
  surname.value = ''
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
}

const deleteUser = (user: User) => {
  RequestHelper.delete(`http://${authHost}:${authPort}/users/${user.id}`)
    .then((res: any) => {
      RequestHelper.delete(`http://${userHost}:${userPort}/${user.id}`)
        .then((res: any) => {
          console.log(res)
          getUsers()
          popPositive($q, 'User deleted successfully')
        })
        .catch(() => {
          popNegative($q, 'Error while deleting user')
        })
    })
    .catch((err: any) => {
      console.log(err)
      popNegative($q, 'Error while deleting user')
    })
}

onMounted(() => {
  getUsers()
  getPermissions()
  getContacts()
})
</script>

<template>
  <div class="container-insertion">
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
          v-model="mail"
          label="Mail"
          lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Phone required']"
        />
        <label>Permissions</label>
        <q-select
          filled
          v-model="permissions"
          multiple
          :options="optionsPermissions"
          counter
          hint="Permissions"
          style="width: 250px"
        />
        <label>Contacts</label>
        <q-select
          filled
          v-model="contacts"
          multiple
          :options="optionsContacts"
          counter
          hint="Contacts"
          style="width: 250px"
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
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Create" type="submit" color="primary" />
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

.container-insertion {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
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
