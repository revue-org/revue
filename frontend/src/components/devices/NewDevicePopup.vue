<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { ref, toRaw } from 'vue'
import { type Camera, DeviceType, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import {
  DeviceFactoryImpl,
  DeviceIdFactoryImpl,
  ResolutionFactoryImpl
} from '@domain/device/factories'
import { AnomalyType } from 'domain/dist/domain/anomaly/core'
import type { ExceedingRule, IntrusionRule } from 'domain/dist/domain/security-rule/core'
import type { Contact } from 'domain/dist/domain/monitoring/core'

const emit = defineEmits<{
  (e: 'update-devices'): void
  (e: 'insert-camera', camera: Camera): void
  (e: 'insert-sensor', sensor: Sensor): void
}>()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const deviceType: ref<DeviceType> = ref(DeviceType.SENSOR)
const code: ref<String> = ref('')
const ipAddress: ref<String> = ref('')
const width: ref<number> = ref()
const height: ref<number> = ref()
const intervalMillis: ref<number> = ref()
const measures: ref<Measure[]> = ref([Measure.TEMPERATURE])
const options = ref([
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

const addNewDevice = () => {
  if (deviceType.value == DeviceType.SENSOR) {
    const newSensor: Sensor = deviceFactory.createSensor(
      deviceIdFactory.createSensorId(code.value),
      ipAddress.value,
      intervalMillis.value,
      measures.value
    )
    emit('insert-sensor', newSensor)
  } else if (deviceType.value == DeviceType.CAMERA) {
    const newCamera: Camera = deviceFactory.createCamera(
      deviceIdFactory.createCameraId(code.value),
      ipAddress.value,
      resolutionFactory.createResolution(width.value, height.value)
    )
    emit('insert-camera', newCamera)
  }

  /*if (anomalyType.value == AnomalyType.EXCEEDING) {
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
  }*/
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Add a Device</h3>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-radio dense v-model="deviceType" :val="DeviceType.SENSOR" label="Sensor" />
        <q-radio dense v-model="deviceType" :val="DeviceType.CAMERA" label="Camera" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Code</label>
        <q-input dense v-model="code" autofocus />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>IP Address</label>
        <q-input dense v-model="ipAddress" />
      </q-card-section>
      <div v-if="deviceType == DeviceType.CAMERA">
        <q-card-section class="q-pt-none resolution">
          <label>Resolution</label>
          <q-input type="number" v-model="width" placeholder="Width" />
          <span>x</span>
          <q-input type="number" v-model="height" placeholder="Height" />
        </q-card-section>
      </div>

      <div v-if="deviceType == DeviceType.SENSOR">
        <q-card-section class="q-pt-none">
          <label>Acquisition rate (ms)</label>
          <q-input type="number" v-model="intervalMillis" />
        </q-card-section>
        <q-option-group
          style="display: flex"
          v-model="measures"
          :options="options"
          type="checkbox"
        />
      </div>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="addNewDevice" />
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
