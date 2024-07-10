<script setup lang="ts">
import { ref } from 'vue'
import { popNegative } from '@/scripts/Popups'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const emit = defineEmits(['add-permission'])

const room = ref<string>('')

const resetFields = () => {
  room.value = ''
}

const addNewPermission = () => {
  if (!room.value) {
    popNegative($q, 'Please fill all fields')
    return
  }
  emit('add-permission', room.value)
  resetFields()
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Add permission</h3>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Room</label>
        <q-input dense v-model="room" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="addNewPermission" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
