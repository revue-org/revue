<script setup lang="ts">
import {useQuasar} from 'quasar'
import type { User } from "@/domain/core/User";
import { popDelete } from "@/scripts/Popups";
import Contact from "@/components/admin/Contact.vue";
import Permission from "@/components/admin/Permission.vue";

const $q = useQuasar()

defineProps<{
  user: User
}>()
const emit = defineEmits<{
  (e: 'delete-user'): void
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
      <q-badge outline color="orange" label="Guardian" style="width: 85px" />
      <span class="name">{{ user.name }} {{ user.surname }}</span>
      <span class="username"><i>Username:</i> {{ user.username }}</span>
      <span class="mail"><i>Mail:</i> {{ user.mail }}</span>
      <span class="contacts">
        <i>Contacts:</i>
        <contact v-for="(contact, index) in user.contacts" :key="index" :contact="contact" @delete-contact="deleteContact"/>
      </span>
      <span class="permissions">
        <i>Permissions:</i>
        <permission v-for="(permission, index) in user.permissions" :key="index" :permission="permission"/>
      </span>
      <q-btn color="red" style="font-size: 12px" icon="delete" @click="deleteUser"/>

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
    flex-direction: column;
    gap: 2px;
  }


}
</style>
