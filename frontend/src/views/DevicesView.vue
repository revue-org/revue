<script lang="ts"></script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import DeviceBadge from '@/components/devices/DeviceBadge.vue'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, ResolutionFactoryImpl } from '@domain/device/factories'
import type { Camera, Device, Sensor } from '@domain/device/core'
import { Measure } from '@domain/device/core'
import NewDevicePopup from '@/components/devices/NewDevicePopup.vue'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { DeviceTypeConverter, MeasureConverter } from '@utils/index'

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const sensors: ref<Sensor[]> = ref([])
const cameras: ref<Camera[]> = ref([])

const getSensors = async () => {
  await RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/sensors`)
    .then((res: any) => {
      sensors.value = []
      for (let i = 0; i < res.data.length; i++) {
        sensors.value.push(composeSensor(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}
const getCameras = async () => {
  await RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/cameras`)
    .then((res: any) => {
      cameras.value = []
      for (let i = 0; i < res.data.length; i++) {
        cameras.value.push(composeCamera(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const composeSensor = (sensor: any): Sensor => {
  return deviceFactory.createSensor(
    deviceIdFactory.createSensorId(sensor._id.code),
    sensor.ipAddress,
    sensor.intervalMillis,
    composeMeasure(sensor.measures)
  )
}

const composeCamera = (camera: any): Camera => {
  return deviceFactory.createCamera(
    deviceIdFactory.createCameraId(camera._id.code),
    camera.ipAddress,
    resolutionFactory.createResolution(camera.resolution.width, camera.resolution.height)
  )
}

function composeMeasure(measures: any): Measure[] {
  return measures.map((measure: any) => {
    return MeasureConverter.convertToMeasure(measure)
  })
}

const insertSensor = async (sensor: Sensor) => {
  await RequestHelper.post(`http://${monitoringHost}:${monitoringPort}/devices/sensors`, {
    code: sensor.deviceId.code,
    ipAddress: sensor.ipAddress,
    intervalMillis: sensor.intervalMillis,
    measures: sensor.measures.map((m: Measure) => {
      return MeasureConverter.convertToString(m)
    })
  })
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getSensors()
    })
    .catch(error => {
      console.log(error)
    })
}

const insertCamera = async (camera: Camera) => {
  await RequestHelper.post(`http://${monitoringHost}:${monitoringPort}/devices/cameras`, {
    code: camera.deviceId.code,
    ipAddress: camera.ipAddress,
    resolution: {
      width: camera.resolution.width,
      height: camera.resolution.height
    }
  })
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getCameras()
    })
    .catch(error => {
      console.log(error)
    })
}

const deleteDevice = async (device: Device) => {
  await RequestHelper.delete(
    `http://${monitoringHost}:${monitoringPort}/devices/${DeviceTypeConverter.convertToString(device.deviceId.type).toLowerCase()}s/` +
      device.deviceId.code
  )
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getSensors()
    })
    .catch(error => {
      console.log(error)
    })
}

onMounted(async () => {
  await getSensors()
  await getCameras()
})

const newPopupVisible = ref<boolean>(false)
</script>

<template>
  <div class="new-device">
    <q-btn label="Add a device" color="primary" @click="newPopupVisible = true" />
  </div>

  <h2>Sensors</h2>

  <div class="sensors-container">
    <device-badge
      v-for="sensor in sensors"
      :key="sensor.deviceId"
      :device="sensor"
      @delete-device="deleteDevice(sensor)"
    />
  </div>

  <h2>Cameras</h2>
  <div class="cameras-container">
    <device-badge
      v-for="camera in cameras"
      :key="camera.deviceId"
      :device="camera"
      @delete-device="deleteDevice(camera)"
    />
  </div>

  <new-device-popup
    v-model="newPopupVisible"
    @insert-sensor="insertSensor"
    @insert-camera="insertCamera"
  ></new-device-popup>
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
