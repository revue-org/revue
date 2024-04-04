<script lang="ts"></script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DeviceBadge from '@/components/devices/DeviceBadge.vue'
import type { Camera, Device, Sensor } from '@domain/device/core'
import { Measure } from '@domain/device/core'
import NewDevicePopup from '@/components/devices/NewDevicePopup.vue'
import { popNegative, popPositive } from '@/scripts/Popups.js'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { DeviceTypeConverter, MeasureConverter } from '@utils/index'
import { useQuasar } from 'quasar'
import { composeCamera, composeSensor } from '@/scripts/presentation/device/ComposeDevice'

const sensors: ref<Sensor[]> = ref([])
const cameras: ref<Camera[]> = ref([])
const $q = useQuasar()

const getSensors = () => {
  RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/sensors`)
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
const getCameras = () => {
  RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/cameras`)
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

const insertSensor = async (sensor: Sensor) => {
  await RequestHelper.post(`http://${monitoringHost}:${monitoringPort}/devices/sensors`, {
    code: sensor.deviceId.code,
    ipAddress: sensor.ipAddress,
    intervalMillis: sensor.intervalMillis,
    measures: sensor.measures.map((m: Measure) => {
      return MeasureConverter.convertToString(m)
    })
  })
    .then((res: any) => {
      popPositive($q, 'Sensor added successfully')
      getSensors()
    })
    .catch(error => {
      popNegative($q, 'Error while deleting sensor')
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
    .then((res: any) => {
      getCameras()
      popPositive($q, 'Camera added successfully')
    })
    .catch(error => {
      popNegative($q, 'Error while deleting camera')
      console.log(error)
    })
}

const deleteDevice = async (device: Device) => {
  await RequestHelper.delete(
    `http://${monitoringHost}:${monitoringPort}/devices/${DeviceTypeConverter.convertToString(device.deviceId.type).toLowerCase()}s/` +
      device.deviceId.code
  )
    .then((res: any) => {
      getSensors()
      getCameras()
      popPositive($q, 'Device deleted successfully')
    })
    .catch(error => {
      popNegative($q, 'Error while deleting device')
      console.log(error)
    })
}

onMounted(async () => {
  getSensors()
  getCameras()
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
      @get-sensors="getSensors"
    />
  </div>

  <h2>Cameras</h2>
  <div class="cameras-container">
    <device-badge
      v-for="camera in cameras"
      :key="camera.deviceId"
      :device="camera"
      @delete-device="deleteDevice(camera)"
      @get-cameras="getCameras"
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
