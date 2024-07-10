<script setup lang="ts">
import { useQuasar } from 'quasar'
import { popDelete } from '@/scripts/Popups'

const $q = useQuasar()

defineProps<{
  permission: string
  deletable: boolean
}>()
const emit = defineEmits<{
  (e: 'delete-permission'): void
}>()

const deletePermission = () => {
  popDelete($q, `Confirm permission deletion?`, () => emit('delete-permission'))
}
</script>

<template>
  <li>
    <div class="infos">
      <span class="type"><i>Room: </i>{{ permission }}</span>
    </div>
    <q-btn
      v-show="deletable"
      class="delete"
      round
      color="red"
      style="font-size: 5px"
      icon="remove"
      @click="deletePermission"
    />
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
