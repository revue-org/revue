<script setup lang="ts">
import RequestHelper, { alarmHost, deviceHost } from '@/utils/RequestHelper'
import { useUserStore } from '@/stores/user'
import { onMounted, ref, watch } from 'vue'
import { type Contact, MeasureType, MeasureUnit, ObjectClass } from 'common/dist/domain/core'
import { popNegative, popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import { MeasureFactory } from 'common/dist/domain/factories'

const $q = useQuasar()

const emit = defineEmits<{
  (_e: 'get-range-rules'): void
  (_e: 'get-intrusion-rules'): void
}>()

const type = ref<string>('range')
const contacts: ref<Contact[]> = ref([])
const description = ref<string>()
const from = ref<string>('')
const to = ref<string>('')
const deviceId = ref<string>('')
const min = ref<string>('')
const max = ref<string>('')
const measureType = ref<MeasureType>()
const measureUnit = ref<MeasureUnit>()
const objectClass = ref<ObjectClass>(ObjectClass.PERSON)

const insertRule = async () => {
  let url: string = `${alarmHost}/rules/`
  let body: any
  let updatedContacts = contacts.value.map((contact: any) => {
    return {
      type: contact.label.split(':')[0],
      value: contact.value
    }
  })
  const commonBody: any = {
    // @ts-ignore
    activeOn: deviceId.value.value,
    author: useUserStore().username,
    description: description.value,
    validityStart: new Date('1970-01-01T' + from.value.slice(0, 5) + ':00.000Z'),
    validityEnd: new Date('2030-01-01T' + to.value.slice(0, 5) + ':00.000Z'),
    contacts: updatedContacts
  }
  if (type.value === 'range') {
    url = url + 'ranges/'
    body = {
      ...commonBody,
      rule: {
        minValue: parseInt(min.value),
        maxValue: parseInt(max.value),
        measure: {
          type: measureType.value?.toLowerCase(),
          unit: measureUnit.value?.toLowerCase()
        }
      }
    }
  } else {
    url = url + 'intrusions/'
    body = {
      ...commonBody,
      objectClass: objectClass.value.toLowerCase()
    }
  }

  await RequestHelper.post(url, body)
    .then(async (_res: any) => {
      type.value === 'range' ? emit('get-range-rules') : emit('get-intrusion-rules')
      popPositive($q, 'Rule added successfully')
      clear()
    })
    .catch(error => {
      console.log(error)
      popNegative($q, 'Error while adding rule')
    })
}

const optionsObjectClass = ref(
  Array.of(ObjectClass.PERSON, ObjectClass.CAR, ObjectClass.TRUCK, ObjectClass.BOAT).map(value => {
    return {
      label: value.toUpperCase(),
      value: value
    }
  })
)

const optionsMeasure = ref(
  Object.keys(MeasureType)
    .filter(key => isNaN(Number(key)))
    .map(value => {
      return {
        label: value,
        value: value
      }
    })
)

const optionsMeasureUnit = ref(
  Object.keys(MeasureUnit)
    .filter(key => isNaN(Number(key)))
    .map(value => {
      return {
        label: value,
        value: value
      }
    })
)

const optionsDeviceIds: ref<{ label: string; value: string }> = ref([])
const getDeviceIds = async () => {
  const locations = useUserStore().permissions
  for (let i = 0; i < locations.length; i++) {
    await RequestHelper.get(`${deviceHost}/devices/locations/${locations[i]}`)
      .then((res: any) => {
        console.log(res.data)
        for (let j = 0; j < res.data.length; j++) {
          if (!optionsDeviceIds.value.includes(res.data[j].deviceId.value)) {
            optionsDeviceIds.value.push({
              label: res.data[j].deviceId.value,
              value: res.data[j].deviceId.value
            })
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const optionsContacts: ref<{ label: string; value: string }> = ref(
  useUserStore().contacts.map((contact: any) => {
    return {
      label: contact.type + ': ' + contact.value,
      value: contact.value
    }
  })
)

watch(
  () => measureType.value,
  () => {
    console.log(measureType.value)
    optionsMeasureUnit.value = MeasureFactory.getValidUnits(
      measureType.value?.toLowerCase() as MeasureType
    ).map((unit: string) => {
      return {
        label: unit.toUpperCase(),
        value: unit.toUpperCase()
      }
    })
  }
)

onMounted(async () => {
  await getDeviceIds()
})

const clear = () => {
  type.value = 'range'
  contacts.value = []
  description.value = ''
  from.value = ''
  to.value = ''
  deviceId.value = ''
  min.value = ''
  max.value = ''
  measureType.value = MeasureType.TEMPERATURE
  measureUnit.value = MeasureUnit.CELSIUS
  objectClass.value = ObjectClass.PERSON
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Add a Security Rule</h3>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-radio dense v-model="type" :val="'range'" label="Range" />
        <q-radio dense v-model="type" :val="'intrusion'" label="Intrusion" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Device</label>
        <q-select v-model="deviceId" :options="optionsDeviceIds" label="Id" />
      </q-card-section>
      <div v-if="type == 'range'">
        <q-card-section class="q-pt-none">
          <label>Measure</label>
          <q-option-group
            style="display: flex; flex-direction: column"
            v-model="measureType"
            :options="optionsMeasure"
            type="radio"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <label>Unit</label>
          <q-option-group
            style="display: flex; flex-direction: column"
            v-model="measureUnit"
            :options="optionsMeasureUnit"
            type="radio"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <label>Min tolerated value</label>
          <q-input type="number" v-model="min" />
          <label>Max tolerated value</label>
          <q-input type="number" v-model="max" />
        </q-card-section>
      </div>
      <div v-if="type == 'intrusion'">
        <q-card-section class="q-pt-none">
          <label>ObjectClass</label>
          <q-option-group
            style="display: flex"
            v-model="objectClass"
            :options="optionsObjectClass"
            type="radio"
          />
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
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="insertRule()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
