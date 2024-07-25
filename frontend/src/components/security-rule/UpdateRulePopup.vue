<script setup lang="ts">
import type { IntrusionRule, RangeRule, SecurityRule } from '@/domain/core/SecurityRule'
import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import { onMounted, ref } from 'vue'
import { popNegative, popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import { type Contact } from 'common/dist/domain/core'
import { useUserStore } from '@/stores/user'

const $q = useQuasar()

const emit = defineEmits<{
  (_e: 'get-range-rules'): void
  (_e: 'get-intrusion-rules'): void
}>()

const { rule } = defineProps<{
  rule: SecurityRule
}>()

const description = ref<string>(rule.description)
const from = ref<string>(rule.validity.from.toLocaleString().split(' ')[1].slice(0, 5))
const to = ref<string>(rule.validity.to.toLocaleString().split(' ')[1].slice(0, 5))
const min = ref<number>((rule as RangeRule).min)
const max = ref<number>((rule as RangeRule).max)

const updateRule = async (rule: SecurityRule) => {
  let url: string = `http://${alarmHost}:${alarmPort}/rules/`
  let body: any
  let updatedContacts = contacts.value.map((contact: any) => {
    return {
      type: contact.label.split(':')[0],
      value: contact.value
    }
  })
  const commonBody: any = {
    description: description.value,
    validityStart: new Date('1970-01-01T' + from.value.slice(0, 5) + ':00.000Z'),
    validityEnd: new Date('2030-01-01T' + to.value.slice(0, 5) + ':00.000Z'),
    contacts: updatedContacts
  }
  if (rule.type === 'range') {
    url = url + 'ranges/' + rule.id
    body = {
      ...commonBody,
      min: min.value,
      max: max.value
    }
  } else {
    url = url + 'intrusions/' + rule.id
    body = {
      ...commonBody,
      objectClass: (rule as IntrusionRule).objectClass
    }
  }
  await RequestHelper.put(url, body)
    .then(async (_res: any) => {
      rule.type === 'range' ? emit('get-range-rules') : emit('get-intrusion-rules')
      popPositive($q, 'Rule updated successfully')
    })
    .catch(error => {
      console.log(error)
      popNegative($q, 'Error while updating rule')
    })
}

const optionsContacts: ref<{ label: string; value: string }> = ref(
  rule.contacts.map(contact => {
    return {
      label: contact.type + ': ' + contact.value,
      value: contact.value
    }
  })
)
const getContacts = async () => {
  useUserStore().contacts.forEach((contact: Contact) => {
    optionsContacts.value.push({
      label: contact.type + ': ' + contact.value,
      value: contact.value
    })
  })
}

const contacts: ref<Contact[]> = ref(
  rule.contacts.map(contact => {
    return {
      label: contact.type + ': ' + contact.value,
      value: contact.value
    }
  })
)

onMounted(async () => {
  await getContacts()
})
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Update Security Rule</h3>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Code</label>
        <q-input v-model="rule.activeOn" label="Device code" disable />
      </q-card-section>
      <div v-if="rule.type == 'range'">
        <q-card-section class="q-pt-none">
          <label>Min tolerated value</label>
          <q-input type="number" v-model="min" />
          <label>Max tolerated value</label>
          <q-input type="number" v-model="max" />
        </q-card-section>
      </div>
      <q-card-section>
        <label>Description</label>
        <q-input v-model="description" label="Rule description" />
      </q-card-section>
      <q-card-section>
        <label>Contacts</label>
        <q-select
          filled
          v-model="contacts"
          multiple
          :options="optionsContacts"
          counter
          hint="Contacts to notify"
          style="width: 250px"
        />
      </q-card-section>
      <div>
        <q-card-section class="q-pt-none">
          <label>Validation From</label>
          <q-input type="time" v-model="from" />
          <label>To</label>
          <q-input type="time" v-model="to" />
        </q-card-section>
      </div>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="updateRule(rule)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
div.resolution {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 15px;

  input {
    height: 50px !important;
  }
}
</style>
