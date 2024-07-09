<script setup lang="ts">
import {useQuasar} from 'quasar'
import type { User } from "@/domain/core/User";
import { popDelete } from "@/scripts/Popups";

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
</script>

<template>
  <p>ciao</p>
<!--  <li>
    <q-badge v-if="user === 'admin'" outline color="red" label="Admin"/>
    <q-badge v-else-if="user === 'expert'" outline color="orange" label="Perito"/>
    <div class="infos">
      <span class="name">{{ user.name }} {{ user.surname }}</span>
      <span class="username"><i>Username:</i> {{ user.username }}</span>
      <span class="phone"><i>Cellulare:</i> {{ user.phone }}</span>
    </div>
    <q-btn class="delete" round color="red" style="font-size: 12px" icon="delete" @click="deleteUser"/>
  </li>-->
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

  .delete {
    margin-left: auto;
  }
}
</style>
