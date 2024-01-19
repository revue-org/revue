<script lang="ts"></script>
<script setup lang="ts">
import { ref } from 'vue'

import SensorBadge from '@/components/devices/DeviceBadge.vue'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, ResolutionFactoryImpl, EnvironmentDataFactoryImpl } from '@domain/device/factories'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory, EnvironmentDataFactory } from '@domain/device/factories'

import type { Sensor } from '@domain/device/core/Sensor'
import type { Camera } from '@domain/device/core/Camera'
import { Measure } from '@domain/device/core/impl/enum/Measure'
import type { EnvironmentData } from 'domain/dist/domain/device/core/EnvironmentData'
import { MeasureUnit } from 'domain/dist/domain/device/core/impl/enum/MeasureUnit'
import NewDevicePopup from '@/components/devices/NewDevicePopup.vue'

const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const sensors: ref<Sensor[]> = ref([
  deviceFactory.createSensor(deviceIdFactory.createSensorId('Sensor 1'), '192.168.1.10', 5, [
    Measure.HUMIDITY,
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ]),
  deviceFactory.createSensor(deviceIdFactory.createSensorId('Sensor 2'), '192.168.1.11', 5, [
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ])
])

const environmentData: EnvironmentData = environmentDataFactory.createEnvironmentData(
  deviceIdFactory.createSensorId('Sensor 1'),
  20,
  Measure.PRESSURE,
  MeasureUnit.PASCAL,
  new Date()
)

const cameras: ref<Camera[]> = ref([
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('Camera 1'),
    '192.168.1.13',
    resolutionFactory.createResolution(1920, 1080)
  ),
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('Camera 2'),
    '192.168.1.14',
    resolutionFactory.createResolution(1920, 1080)
  )
])

const deleteSensor = (sensor: Sensor) => {
  const index = sensors.value.findIndex((s: Sensor) => s.deviceId === sensor.deviceId)
  if (index !== -1) {
    sensors.value.splice(index, 1)
  }
}
const deleteCamera = (camera: Camera) => {
  const index = cameras.value.findIndex((s: Camera) => s.deviceId === camera.deviceId)
  if (index !== -1) {
    cameras.value.splice(index, 1)
  }
}
const getDevices = () => {
  console.log('getDevices')
  return [...sensors.value, ...cameras.value]
}

const popupVisible = ref<boolean>(false)

</script>

<template>
  <div class="new-device">
    <q-btn label="Add a device" color="primary" @click="popupVisible = true" />
  </div>

  <h2>Sensors</h2>

  <div class="sensors-container">
    <sensor-badge
      v-for="sensor in sensors"
      :key="sensor.deviceId"
      :device="sensor"
      @delete-sensor="deleteSensor"
    />
  </div>

  <h2>Cameras</h2>
  <div class="cameras-container">
    <sensor-badge
      v-for="camera in cameras"
      :key="camera.deviceId"
      :device="camera"
      @delete-camera="deleteCamera"
    />
  </div>

  <new-device-popup v-model="popupVisible" @update-devices="getDevices"></new-device-popup>
</template>

<style scoped lang="scss">

div.new-device {
  text-align: center;
  padding-top: 15px;
}
h2 {
  margin: 0.5rem 1rem;
}

div.sensors-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}

div.cameras-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}
</style>
