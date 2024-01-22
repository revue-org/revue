<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { ref } from 'vue'
import { DeviceType } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, ResolutionFactoryImpl } from '@domain/device/factories'

const emit = defineEmits<{
  (e: 'update-devices'): void
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
    console.log(
      deviceFactory.createSensor(
        deviceIdFactory.createSensorId(code),
        ipAddress,
        intervalMillis,
        measures.value
      )
    )
  } else if (deviceType.value == DeviceType.CAMERA) {
    console.log(
      deviceFactory.createCamera(
        deviceIdFactory.createCameraId(code),
        ipAddress,
        resolutionFactory.createResolution(width, height)
      )
    )
  }
  emit('update-devices')
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
          <q-input v-model="width" placeholder="Width" />
          <span>x</span>
          <q-input v-model="height" placeholder="Height" />
        </q-card-section>
      </div>

      <div v-if="deviceType == DeviceType.SENSOR">
        <q-card-section class="q-pt-none">
          <label>Acquisition rate (ms)</label>
          <q-input v-model="intervalMillis" />
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
