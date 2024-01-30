<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { ref, toRaw } from 'vue'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, ResolutionFactoryImpl } from '@domain/device/factories'
import { AnomalyType } from 'domain/dist/domain/anomaly/core'
import { type SecurityRuleFactory, SecurityRuleFactoryImpl } from 'domain/dist/domain/security-rule/factories'
import type { Contact } from 'domain/dist/domain/monitoring/core'
import { type ExceedingRule, type IntrusionRule, ObjectClass } from 'domain/dist/domain/security-rule/core'
import { MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'

const emit = defineEmits<{
  (e: 'insert-exceeding-rule', exceedingRule: ExceedingRule): void
  (e: 'insert-intrusion-rule', intrusionRule: IntrusionRule): void
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

const optionsObjectClass = ref(
  Object.keys(ObjectClass)
    .filter(key => isNaN(Number(key)))
    .map(value => {
      return {
        label: value,
        value: ObjectClassConverter.convertToObjectClass(value)
      }
    })
)

const optionsMeasure = ref(
  Object.keys(Measure)
    .filter(key => isNaN(Number(key)))
    .map(value => {
      return {
        label: value,
        value: MeasureConverter.convertToMeasure(value)
      }
    })
)

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
    label: 'EMAIL',
    value: 'mail@gmail.com'
  },
  {
    label: 'SMS',
    value: '3333333333'
  }
])
const addNewSecurityRule = () => {
  if (anomalyType.value == AnomalyType.EXCEEDING) {
    const newExceedingRule: ExceedingRule = securityRuleFactory.createExceedingRule(
      min.value,
      max.value,
      measure.value,
      '',
      deviceIdFactory.createSensorId(toRaw(code.value).value),
      'aaaaaaaaaaaaaaaaaaaaaaaa', // to put the id of the user taken from the pinia storage
      toRaw(contacts.value).map((c: Contact) => {
        return {
          type: toRaw(c).label,
          value: toRaw(c).value
        }
      }),
      description.value,
      new Date('1970-01-01T' + from.value + ':00.000Z'),
      new Date('2030-01-01T' + to.value + ':00.000Z')
    )
    emit('insert-exceeding-rule', newExceedingRule)
  } else if (anomalyType.value == AnomalyType.INTRUSION) {
    const newIntrusionRule: IntrusionRule = securityRuleFactory.createIntrusionRule(
      objectClass.value,
      '',
      deviceIdFactory.createCameraId(toRaw(code.value).value),
      'aaaaaaaaaaaaaaaaaaaaaaaa', // to put the id of the user taken from the pinia storage
      toRaw(contacts.value).map((c: Contact) => {
        return {
          type: toRaw(c).label,
          value: toRaw(c).value
        }
      }),
      description.value,
      new Date('1970-01-01T' + from.value + ':00.000Z'),
      new Date('2040-01-01T' + to.value + ':00.000Z')
    )
    emit('insert-intrusion-rule', newIntrusionRule)
  }
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
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="addNewSecurityRule" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
