<script setup lang="ts">
import { useQuasar } from 'quasar'
import type { User } from '@/domain/core/User'
import { popDelete, popPositive } from '@/scripts/Popups'
import ContactBadge from '@/components/admin/ContactBadge.vue'
import PermissionBadge from '@/components/admin/PermissionBadge.vue'
import RequestHelper, { authHost, authPort, userHost, userPort } from '@/utils/RequestHelper'
import NewContactPopup from '@/components/admin/NewContactPopup.vue'
import { defineEmits, defineProps, ref } from 'vue'
import NewPermissionPopup from '@/components/admin/NewPermissionPopup.vue'
import type { Contact } from 'common/dist/domain/core'

const $q = useQuasar()

const prop = defineProps<{
  user: User
}>()
const emit = defineEmits<{
  (e: 'delete-user'): void
  (e: 'delete-contact'): void
  (e: 'get-users'): void
}>()

const contactPopup = ref<boolean>(false)
const permissionPopup = ref<boolean>(false)

const deleteUser = () => {
  popDelete($q, `Confirm user deletion?`, () => emit('delete-user'))
}

const updatePermissions = async (permissions: string[]) => {
  await RequestHelper.put(`http://${authHost}:${authPort}/permissions/${prop.user.id}`, {
    name: prop.user.name,
    surname: prop.user.surname,
    permissions: permissions
  }).then(() => {
    popPositive($q, 'Permission updated successfully')
    prop.user.permissions = permissions
    console.log(prop.user.permissions, permissions)
  })
}

const addContact = async (contact: any) => {
  prop.user.contacts.push(contact)

  console.log(prop.user.contacts)
  await RequestHelper.put(`http://${userHost}:${userPort}/${prop.user.id}`, {
    name: prop.user.name,
    surname: prop.user.surname,
    contacts: prop.user.contacts
  }).then(() => {
    popPositive($q, 'Contact added successfully')
  })
}

const removeContact = (contact: Contact) => {
  prop.user.contacts = prop.user.contacts.filter(c => c !== contact)
  console.log(prop.user.contacts)
  RequestHelper.put(`http://${userHost}:${userPort}/${prop.user.id}`, {
    name: prop.user.name,
    surname: prop.user.surname,
    contacts: prop.user.contacts
  }).then(() => {
    popPositive($q, 'Contact removed successfully')
  })
}
</script>

<template>
  <li>
    <div class="infos">
      <q-card-section class="q-pt-none registry">
        <q-badge outline color="orange" label="Guardian" style="width: 85px" />
        <span class="name">{{ user.name }} {{ user.surname }}</span>
        <span class="username"><i>Username:</i> {{ user.username }}</span>
        <span class="mail"><i>Mail:</i> {{ user.mail }}</span>
      </q-card-section>
      <q-card-section class="q-pt-none contacts">
        <span class="">
          <i>Contacts:</i>
          <q-btn
            class="btn-add"
            label="+"
            type="submit"
            color="primary"
            @click.prevent
            @click="contactPopup = true"
            style="width: 5px; height: 5px"
          />

          <contact-badge
            v-for="(contact, index) in user.contacts"
            :key="index"
            :contact="contact"
            @delete-contact="removeContact(contact)"
          />
        </span>
      </q-card-section>
      <q-card-section class="q-pt-none permissions">
        <span>
          <i>Permissions:</i>
          <q-btn
            class="btn-add"
            label="+"
            type="submit"
            color="primary"
            @click.prevent
            @click="permissionPopup = true"
            style="width: 5px; height: 5px"
          />
          <permission-badge
            v-for="(permission, index) in user.permissions"
            :key="index"
            :permission="permission"
            :deletable="false"
          />
        </span>
      </q-card-section>
      <q-card-section class="q-pt-none delete">
        <q-btn color="red" style="font-size: 12px; height: 30px" icon="delete" @click="deleteUser" />
      </q-card-section>
    </div>
  </li>
  <new-contact-popup v-model="contactPopup" @add-contact="addContact"></new-contact-popup>
  <new-permission-popup
    v-model="permissionPopup"
    @update-permissions="updatePermissions"
    :userPermissions="prop.user.permissions"
  ></new-permission-popup>
</template>

<style scoped lang="scss">
li {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 5px 20px;
  margin: 5px 0;

  * {
    font-size: 16px;
  }

  .infos {
    .name {
      font-size: 18px;
    }

    .btn-add {
      height: 3px;
    }

    display: flex;
    flex-direction: row;

    .contacts {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 30%;
    }

    .permissions {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 30%;
    }

    .registry {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 35%;
    }

    .delete {
      display: flex;
      gap: 2px;
      width: 25%;
      align-content: center;
      align-items: center;
    }
  }
}
</style>
