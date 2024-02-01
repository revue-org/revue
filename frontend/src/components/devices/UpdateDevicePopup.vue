<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { ref } from 'vue'
import { type Camera, type Device, DeviceType, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, ResolutionFactoryImpl } from '@domain/device/factories'

const { device } = defineProps<{
  device: Device
}>()

const emit = defineEmits<{
  (e: 'update-camera', camera: Camera): void
  (e: 'update-sensor', sensor: Sensor): void
}>()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const measures: ref<Measure[]> = ref([])

if (device.deviceId.type == DeviceType.SENSOR) {
  measures.value = (device as Sensor).measures
}

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

const updateDevice = () => {
  if (device.deviceId.type == DeviceType.SENSOR) {
    const updatedSensor: Sensor = deviceFactory.createSensor(
      deviceIdFactory.createSensorId(device.deviceId.code),
      device.isCapturing,
      device.ipAddress,
      (device as Sensor).intervalMillis,
      measures.value
    )
    emit('update-sensor', updatedSensor)
  } else if (device.deviceId.type == DeviceType.CAMERA) {
    const updatedCamera: Camera = deviceFactory.createCamera(
      deviceIdFactory.createCameraId(device.deviceId.code),
      device.isCapturing,
      device.ipAddress,
      resolutionFactory.createResolution(
        (device as Camera).resolution.width,
        (device as Camera).resolution.height
      )
    )
    emit('update-camera', updatedCamera)
  }
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Update Device:</h3>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Code</label>
        <q-input dense v-model="device.deviceId.code" disable autofocus />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>IP Address</label>
        <q-input dense v-model="device.ipAddress" />
      </q-card-section>
      <div v-if="device.deviceId.type == DeviceType.CAMERA">
        <q-card-section class="q-pt-none resolution">
          <label>Resolution</label>
          <q-input type="number" v-model="(device as Camera).resolution.width" placeholder="Width" />
          <span>x</span>
          <q-input type="number" v-model="(device as Camera).resolution.height" placeholder="Height" />
        </q-card-section>
      </div>

      <div v-if="device.deviceId.type == DeviceType.SENSOR">
        <q-card-section class="q-pt-none">
          <label>Acquisition rate (ms)</label>
          <q-input type="number" v-model="(device as Sensor).intervalMillis" value="2" />
        </q-card-section>
        <q-option-group style="display: flex" v-model="measures" :options="options" type="checkbox" />
      </div>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="updateDevice()" />
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
