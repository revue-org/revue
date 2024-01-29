<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { Measure, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl } from '@domain/device/factories'
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
  // deviceFactory.createSensor(deviceIdFactory.createSensorId('sen-02'), '192.168.1.11', 5, [
  //   Measure.TEMPERATURE,
  //   Measure.PRESSURE
  // ]),
  // deviceFactory.createSensor(deviceIdFactory.createSensorId('sen-02'), '192.168.1.11', 5, [
  //   Measure.TEMPERATURE,
  //   Measure.PRESSURE
  // ])
])

const topics = computed(() =>
  sensors.value.map((sensor: Sensor) => 'SENSOR_' + sensor.deviceId.code)
)

onBeforeMount(() => {
  for (const topic of topics.value) {
    if (!topicsStore.subscribedTopics.includes(topic)) {
      socket.emit('subscribe', topics)
    } else {
      console.log('Resume to', topics)
    }
    topicsStore.addTopic(topic)
  }
})

onBeforeUnmount(() => {
  for (const topic of topics.value) {
    if (topicsStore.subscribedTopics.includes(topic)) {
      socket.emit('pause', topics)
    }
    topicsStore.removeTopic(topic)
  }
})

socket.on('env-data', (data) => {
  console.log(JSON.parse(JSON.stringify(data)))
})
</script>

<template>
  <h2>Environment data</h2>
  <div>
    <sensor-data v-for="(sensor, index) in sensors" :key="index" :sensor="sensor" />
  </div>
</template>

<style scoped lang="scss"></style>
