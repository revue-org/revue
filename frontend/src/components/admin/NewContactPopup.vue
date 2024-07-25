<script setup lang="ts">
import { ref } from 'vue'
import { popNegative } from '@/scripts/Popups'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const emit = defineEmits(['add-contact'])

const type = ref<string>('sms')
const value = ref<string>('')

const resetFields = () => {
  type.value = 'sms'
  value.value = ''
}

const addNewContact = () => {
  if (!type.value || !value.value) {
    popNegative($q, 'Please fill all fields')
    return
  }
  const contact = {
    type: type.value,
    value: value.value
  }
  emit('add-contact', contact)
  resetFields()
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Add contact</h3>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-radio dense v-model="type" :val="'sms'" label="Sms" />
        <q-radio dense v-model="type" :val="'email'" label="Email" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Value</label>
        <q-input dense v-model="value" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="addNewContact" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
