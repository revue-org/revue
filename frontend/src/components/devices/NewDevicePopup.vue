<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { ref, defineEmits } from 'vue'
import type { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl'
import type { DeviceFactory } from 'domain/dist/domain/device/factories/DeviceFactory'
import { DeviceFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceFactoryImpl'
import type { ResolutionFactory } from 'domain/dist/domain/device/factories/ResolutionFactory'
import { ResolutionFactoryImpl } from 'domain/dist/domain/device/factories/impl/ResolutionFactoryImpl'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType'

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
  ]
)


const addNewDevice = () => {
  if (deviceType.value == DeviceType.SENSOR) {
    console.log(deviceFactory.createSensor(
      deviceIdFactory.createSensorId(code),
      ipAddress,
      intervalMillis,
      measures.value
    ))
  } else if (deviceType.value == DeviceType.CAMERA) {
    console.log(deviceFactory.createCamera(
      deviceIdFactory.createCameraId(code),
      ipAddress,
      resolutionFactory.createResolution(width, height)
    ))
  }
  emit('update-devices')
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw;">
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
        <q-input dense v-model="ipAddress" autofocus />
      </q-card-section>
      <div v-if="deviceType == DeviceType.CAMERA">
        <q-card-section class="q-pt-none resolution">
          <label>Resolution</label>
          <q-input v-model="width" autofocus placeholder="Width" />
          <span>x</span>
          <q-input v-model="height" autofocus placeholder="Height" />
        </q-card-section>
      </div>

      <div v-if="deviceType == DeviceType.SENSOR">
        <q-card-section class="q-pt-none">
          <label>Acquisition rate (ms)</label>
          <q-input v-model="intervalMillis" autofocus />
        </q-card-section>
        <q-option-group style="display: flex" v-model="measures" :options="options" type="checkbox" />
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
