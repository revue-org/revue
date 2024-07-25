<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import RequestHelper, { authHost, authPort, userHost, userPort } from '@/utils/RequestHelper'
import type { User } from '@/domain/core/User'
import UserListElement from '@/components/admin/UserListElement.vue'
import { popNegative, popPositive } from '@/scripts/Popups'

const $q = useQuasar()
const users = ref<User[]>([])

const getUsers = async (): Promise<void> => {
  await RequestHelper.get(`http://${authHost}:${authPort}/users`).then((access: any) => {
    users.value = []
    for (let i = 0; i < access.data.length; i++) {
      RequestHelper.get(`http://${userHost}:${userPort}/${access.data[i].id.value}`).then((registry: any) => {
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

const deleteUser = (user: User) => {
  RequestHelper.delete(`http://${authHost}:${authPort}/users/${user.id}`)
    .then(() => {
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
})
</script>

<template>
  <div class="container-insertion">
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
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  padding: 5px;

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
