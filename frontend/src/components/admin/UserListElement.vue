<script setup lang="ts">
import { useQuasar } from 'quasar'
import type { User } from '@/domain/core/User'
import { popDelete } from '@/scripts/Popups'
import Contact from '@/components/admin/Contact.vue'
import Permission from '@/components/admin/Permission.vue'

const $q = useQuasar()

defineProps<{
  user: User
}>()
const emit = defineEmits<{
  (e: 'delete-user'): void
  (e: 'delete-contact'): void
  (e: 'get-users'): void
}>()

const deleteUser = () => {
  popDelete($q, `Confirm user deletion?`, () => emit('delete-user'))
}

const deleteContact = () => {
  popDelete($q, `Confirm contact deletion?`, () => emit('delete-contact'))
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
        <contact
          v-for="(contact, index) in user.contacts"
          :key="index"
          :contact="contact"
          @delete-contact="deleteContact"
        />
      </span>
      </q-card-section>
      <q-card-section class="q-pt-none permissions">
      <span class="">
        <i>Permissions:</i>
        <permission v-for="(permission, index) in user.permissions" :key="index" :permission="permission" />
      </span>
      </q-card-section>
      <q-card-section class="q-pt-none delete">
      <q-btn color="red" style="font-size: 12px; height: 30px" icon="delete" @click="deleteUser" />
      </q-card-section>
    </div>
  </li>
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
    display: flex;
    flex-direction: row;

    .contacts {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 25%;
    }

    .permissions {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 25%;
    }

    .registry {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 165px;
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
