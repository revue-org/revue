<script setup lang="ts">
import {useQuasar} from 'quasar'
import { popDelete } from "@/scripts/Popups";
import { type Contact } from 'common/dist/domain/core';

const $q = useQuasar()

defineProps<{
  contact: Contact
}>()
const emit = defineEmits<{
  (e: 'delete-contact'): void
}>()

const deleteContact = () => {
  popDelete($q, `Confirm contact deletion?`, () => emit('delete-contact'))
}
</script>

<template>
  <li>
    <div class="infos">
      <span class="type">{{ contact.type.toUpperCase() }}</span>
      <span class="value">{{ contact.value.toLowerCase() }}</span>
    </div>
    <q-btn class="delete" round color="red" style="font-size: 5px" icon="remove" @click="deleteContact"/>
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

  .delete {
    margin-left: auto;
  }
}
</style>
