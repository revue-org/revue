<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import RequestHelper, { authHost, authPort, userHost, userPort } from '@/utils/RequestHelper'
import { useUserStore } from '@/stores/user'
import type { Contact } from 'common/dist/domain/core'
import { popNegative, popPositive } from '@/scripts/Popups'
import NewContactPopup from '@/components/admin/NewContactPopup.vue'

const $q = useQuasar()

const name = ref('')
const surname = ref('')
const mail = ref('')
const contacts = ref<Contact[]>([])
const permissions = ref<string[]>([])
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const contactPopup = ref<boolean>(false)

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
            onReset()
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
const getPermissions = async (): Promise<void> => {
  await RequestHelper.get(`http://${authHost}:${authPort}/permissions/${useUserStore().id}`).then(
    (res: any) => {
      optionsPermissions.value = []
      res.value = []
      for (let i = 0; i < res.data.length; i++) {
        optionsPermissions.value.push({
          label: 'Room: ' + res.data[i],
          value: res.data[i]
        })
      }
    }
  )
}

const optionsContacts: ref<{ label: string; value: string }> = ref([])
const addContact = (contact: Contact) => {
  optionsContacts.value.push({
    label: contact.type + ': ' + contact.value,
    value: contact.value
  })
}

const onReset = () => {
  name.value = ''
  surname.value = ''
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
  mail.value = ''
  contacts.value = []
  permissions.value = []
}

onMounted(() => {
  getPermissions()
})
</script>

<template>
  <div class="container-insertion">
    <div class="new-user">
      <h2>Create new user:</h2>
      <div>
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
        <div class="new-contacts">
          <q-select
            filled
            v-model="contacts"
            multiple
            :options="optionsContacts"
            counter
            hint="Contacts"
            style="width: 250px"
          />
          <q-btn
            label="+"
            type="submit"
            color="primary"
            @click.prevent
            @click="contactPopup = true"
            style="align-self: center; margin-bottom: 20px; margin-left: 5px"
          />
        </div>
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
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" @click="onReset" />
          <q-btn label="Create" type="submit" color="primary" @click="addNewUser" />
        </div>
      </div>
    </div>
    <new-contact-popup v-model="contactPopup" @add-contact="addContact"></new-contact-popup>
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
  }

  .new-contacts {
    display: flex;
    flex-direction: row;
  }

  div.buttons,
  div.roles {
    margin: 10px;
  }
}
</style>
