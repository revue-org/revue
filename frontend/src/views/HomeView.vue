<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, type Ref, ref } from 'vue'
import { type EnvironmentData, Measure, MeasureUnit, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, EnvironmentDataFactoryImpl } from '@domain/device/factories'
import SensorData from '@/components/devices/SensorData.vue'

import { socket } from '@/socket'
import { useTopicsStore } from '@/stores/topics'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { type AxiosResponse, HttpStatusCode } from 'axios'
import { MeasureConverter } from 'domain/dist/utils'

const topicsStore = useTopicsStore()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()

let values: Ref<{ sensor: Sensor; values: EnvironmentData[] }[]> = ref([])

RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/sensors`).then((res: AxiosResponse) => {
  if (res.status == HttpStatusCode.Ok) {
    for (let i = 0; i < res.data.length; i++) {
      const sensor = composeSensor(res.data[i])
      values.value.push({
        sensor: sensor,
        values: [
          environmentDataFactory.createEnvironmentData(
            sensor.deviceId,
            20,
            Measure.TEMPERATURE,
            MeasureUnit.CELSIUS
          )
        ]
      })
    }
  }
})

const environmentDataFactory = new EnvironmentDataFactoryImpl()

const composeSensor = (sensor: any): Sensor => {
  console.log(composeMeasure(sensor.measures))
  return deviceFactory.createSensor(
    deviceIdFactory.createSensorId(sensor._id.code),
    sensor.ipAddress,
    sensor.intervalMillis,
    composeMeasure(sensor.measures)
  )
}

function composeMeasure(measures: any): Measure[] {
  return measures.map((measure: any) => {
    return MeasureConverter.convertToMeasure(measure)
  })
}

onBeforeMount(() => {
  console.log('resume' + topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
  socket.emit(
    'resume',
    topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_'))
  )
})

onBeforeUnmount(() => {
  console.log('pause' + topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
  socket.emit(
    'pause',
    topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_'))
  )
})

socket.on('env-data', (data: { topic: string; data: string }) => {
  const rawValues = JSON.parse(data.data)
  const newValues: EnvironmentData[] = []
  for (const rawValue of rawValues) {
    newValues.push(
      environmentDataFactory.createEnvironmentData(
        deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
        rawValue._value,
        rawValue._measure,
        rawValue._measureUnit
      )
    )
  }
  const index = values.value.findIndex(
    (item: { sensor: Sensor; values: EnvironmentData[] }) =>
      item.sensor.deviceId.code === newValues[0].sourceDeviceId.code
  )
  if (index !== -1) {
    values.value[index].values = newValues
  }
})
</script>

<template>
  <h2>Environment data</h2>
  <div>
    <sensor-data v-for="(value, index) in values" :key="index" :sensor-data="value" />
  </div>
</template>

<style scoped lang="scss"></style>
