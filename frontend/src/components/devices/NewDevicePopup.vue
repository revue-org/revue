<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { ref } from 'vue'
import { type Camera, DeviceType, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, ResolutionFactoryImpl } from '@domain/device/factories'
import { MeasureConverter } from 'domain/dist/utils'

const emit = defineEmits<{
  (e: 'insert-camera', camera: Camera): void
  (e: 'insert-sensor', sensor: Sensor): void
}>()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const resetFields = () => {
  deviceType.value = DeviceType.SENSOR
  code.value = undefined
  ipAddress.value = undefined
  width.value = undefined
  height.value = undefined
  intervalMillis.value = undefined
  measures.value = [Measure.TEMPERATURE]
}

const deviceType = ref<DeviceType>(DeviceType.SENSOR)
const code = ref<string>()
const ipAddress = ref<string>()
const width = ref<number>()
const height = ref<number>()
const intervalMillis = ref<number>()
const measures = ref([Measure.TEMPERATURE])

const optionMeasures = ref(
  Object.keys(Measure)
    .filter(key => isNaN(Number(key)))
    .map(value => {
      return {
        label: value,
        value: MeasureConverter.convertToMeasure(value)
      }
    })
)

const addNewDevice = () => {
  if (deviceType.value == DeviceType.SENSOR) {
    const newSensor: Sensor = deviceFactory.createSensor(
      deviceIdFactory.createSensorId(code.value!),
      false,
      ipAddress.value!,
      intervalMillis.value!,
      measures.value
    )
    console.log(newSensor)
    emit('insert-sensor', newSensor)
  } else if (deviceType.value == DeviceType.CAMERA) {
    const newCamera: Camera = deviceFactory.createCamera(
      deviceIdFactory.createCameraId(code.value!),
      false,
      ipAddress.value!,
      resolutionFactory.createResolution(width.value!, height.value!)
    )
    emit('insert-camera', newCamera)
  }
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
        <q-option-group style="display: flex" v-model="measures" :options="optionMeasures" type="checkbox" />
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
