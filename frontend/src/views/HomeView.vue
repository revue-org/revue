<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, type Ref, ref } from 'vue'
import { type EnvironmentData, Measure, MeasureUnit, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, EnvironmentDataFactoryImpl } from '@domain/device/factories'
import SensorData from '@/components/devices/SensorData.vue'

import { socket } from '@/socket'
import { useTopicsStore } from '@/stores/topics'

const topicsStore = useTopicsStore()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()

const sensors: ref<Sensor[]> = ref([
  deviceFactory.createSensor(deviceIdFactory.createSensorId('sen-01'), '192.168.1.10', 5, [
    Measure.HUMIDITY,
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ]),
  deviceFactory.createSensor(deviceIdFactory.createSensorId('sen-02'), '192.168.1.11', 5, [
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ])
])

const environmentDataFactory = new EnvironmentDataFactoryImpl()

let values = ref(
  sensors.value.map((sensor: Sensor) => {
    return {
      sensor: sensor,
      values: [
        environmentDataFactory.createEnvironmentData(
          sensor.deviceId,
          20,
          Measure.TEMPERATURE,
          MeasureUnit.CELSIUS
        )
      ]
    }
  })
)

const topics: Ref<string[]> = computed(() =>
  sensors.value.map((sensor: Sensor) => 'SENSOR_' + sensor.deviceId.code)
)

onBeforeMount(() => {
  console.log('resume' + topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
  socket.emit('resume', topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
})

onBeforeUnmount(() => {
  console.log('pause' + topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
  socket.emit('pause', topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
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
