<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { ref } from 'vue'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, ResolutionFactoryImpl } from '@domain/device/factories'
import { AnomalyType } from 'domain/dist/domain/anomaly/core'
import { type SecurityRuleFactory, SecurityRuleFactoryImpl } from 'domain/dist/domain/security-rule/factories'
import type { Contact } from 'domain/dist/domain/monitoring/core'
import { ObjectClass } from 'domain/dist/domain/security-rule/core'

const emit = defineEmits<{
  (e: 'update-security-rules'): void
}>()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()

const anomalyType: ref<AnomalyType> = ref(AnomalyType.EXCEEDING)
const min: ref<number> = ref()
const max: ref<number> = ref()
const code: ref<String> = ref('')
const contacts: ref<Contact[]> = ref([])
const description: ref<String> = ref('')
const from: ref<Date> = ref()
const to: ref<Date> = ref()
const measure: ref<Measure> = ref(Measure.TEMPERATURE)
const objectClass: ref<ObjectClass> = ref(ObjectClass.PERSON)

const optionsMeasure = ref([
  {
    label: 'Temperature',
    value: Measure.TEMPERATURE
  },
  {
    label: 'Humidity',
    value: Measure.HUMIDITY
  },
  {
    label: 'Pressure',
    value: Measure.PRESSURE
  }
])

const optionsObjectClass = ref([
  {
    label: 'Person',
    value: ObjectClass.PERSON
  },
  {
    label: 'Animal',
    value: ObjectClass.ANIMAL
  },
  {
    label: 'Vehicle',
    value: ObjectClass.VEHICLE
  }
])

const optionsCameraCodes = ref([
  {
    label: 'Camera 1',
    value: 'Camera 1'
  },
  {
    label: 'Camera 2',
    value: 'Camera 2'
  }
])

const optionsSensorCodes = ref([
  {
    label: 'Sensor 1',
    value: 'Sensor 1'
  },
  {
    label: 'Sensor 2',
    value: 'Sensor 2'
  }
])

const optionsContacts = ref([
  {
    label: 'EMAIL - mail@gmail.com',
    value: 'mail@gmail.com'
  },
  {
    label: 'SMS - 3333333333',
    value: '3333333333'
  }
])
const addNewSecurityRule = () => {
  console.log('ho cliccato per creare una nuova regola di sicurezza')
  if (anomalyType.value == AnomalyType.EXCEEDING) {
    console.log(
      securityRuleFactory.createExceedingRule(
        min,
        max,
        measure,
        '',
        deviceIdFactory.createSensorId(code),
        '',
        contacts,
        description,
        from,
        to
      )
    )
  } else if (anomalyType.value == AnomalyType.INTRUSION) {
    console.log(
      securityRuleFactory.createIntrusionRule(
        objectClass,
        '',
        deviceIdFactory.createCameraId(code),
        '',
        contacts,
        description,
        from,
        to
      )
    )
  }
  emit('update-security-rules')
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Add a Security Rule</h3>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-radio dense v-model="anomalyType" :val="AnomalyType.EXCEEDING" label="Exceeding" />
        <q-radio dense v-model="anomalyType" :val="AnomalyType.INTRUSION" label="Intrusion" />
      </q-card-section>
      <div v-if="anomalyType == AnomalyType.EXCEEDING">
        <q-card-section class="q-pt-none">
          <label>Code</label>
          <q-select v-model="code" :options="optionsSensorCodes" label="Sensor code" />
        </q-card-section>
        <q-option-group
          style="display: flex; flex-direction: column"
          v-model="measure"
          :options="optionsMeasure"
          type="radio"
        />
        <q-card-section class="q-pt-none">
          <label>Min tolerated value</label>
          <q-input type="number" v-model="min" />
          <label>Max tolerated value</label>
          <q-input type="number" v-model="max" />
        </q-card-section>
      </div>
      <div v-if="anomalyType == AnomalyType.INTRUSION">
        <q-card-section class="q-pt-none">
          <label>Code</label>
          <q-select v-model="code" :options="optionsCameraCodes" label="Camera code" />
        </q-card-section>
        <q-option-group
          style="display: flex"
          v-model="objectClass"
          :options="optionsObjectClass"
          type="radio"
        />
      </div>
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
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="addNewSecurityRule" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
