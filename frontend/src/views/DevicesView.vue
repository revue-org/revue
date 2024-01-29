<script lang="ts"></script>
<script setup lang="ts">
import { onMounted, ref } from "vue";

import SensorBadge from '@/components/devices/DeviceBadge.vue'
import type {
  DeviceFactory,
  DeviceIdFactory,
  EnvironmentDataFactory,
  ResolutionFactory
} from '@domain/device/factories'
import {
  DeviceFactoryImpl,
  DeviceIdFactoryImpl,
  EnvironmentDataFactoryImpl,
  ResolutionFactoryImpl
} from '@domain/device/factories'
import type { Camera, EnvironmentData, Sensor } from '@domain/device/core'
import { Measure, MeasureUnit } from '@domain/device/core'
import NewDevicePopup from '@/components/devices/NewDevicePopup.vue'
import RequestHelper from "@/utils/RequestHelper";
import type { Contact } from "domain/dist/domain/monitoring/core";
import { ContactTypeConverter, MeasureConverter } from "domain/dist/utils";
import type { ExceedingRule } from "domain/dist/domain/security-rule/core";

const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const sensors: ref<Sensor[]> = ref([])

const cameras: ref<Camera[]> = ref([])

const getSensors = async () => {
  console.log('getSensors')
  await RequestHelper.get('http://localhost:4001/devices/sensors')
    .then((res: any) => {
      sensors.value = []
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i])
        sensors.value.push(composeSensor(res.data[i]))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
const getCameras = async () => {
  console.log('getCameras')
  await RequestHelper.get('http://localhost:4001/devices/cameras')
    .then((res: any) => {
      cameras.value = []
      for (let i = 0; i < res.data.length; i++) {
        cameras.value.push(composeCamera(res.data[i]))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const composeSensor = (sensor: any): Sensor => {
  console.log(composeMeasure(sensor.measures))
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

const deleteSensor = async (sensor: Sensor) => {
  console.log(sensor.deviceId.type, sensor.deviceId.code)
  await RequestHelper.delete(
    'http://localhost:4001/devices/sensors/' + sensor.deviceId.code
  )
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getSensors()
    })
    .catch((error) => {
      console.log(error)
    })
}
const deleteCamera = async (camera: Camera) => {
  await RequestHelper.delete(
    'http://localhost:4001/devices/cameras/' + camera.deviceId.code
  )
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getCameras()
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  await getSensors()
  await getCameras()
})

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

<!--  to check!!-->
  <new-device-popup v-model="popupVisible" @update-devices="getSensors"></new-device-popup>
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
