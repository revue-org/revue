<script setup lang="ts">
import { ref } from 'vue'
import { Measure, type Sensor } from '@domain/device/core'

import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl } from '@domain/device/factories'
import SensorData from '@/components/devices/SensorData.vue'

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()

const sensors: ref<Sensor[]> = ref([
  deviceFactory.createSensor(deviceIdFactory.createSensorId('Sensor 1'), '192.168.1.10', 5, [
    Measure.HUMIDITY,
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ]),
  deviceFactory.createSensor(deviceIdFactory.createSensorId('Sensor 2'), '192.168.1.11', 5, [
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ]),
  deviceFactory.createSensor(deviceIdFactory.createSensorId('Sensor 2'), '192.168.1.11', 5, [
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ]),
  deviceFactory.createSensor(deviceIdFactory.createSensorId('Sensor 2'), '192.168.1.11', 5, [
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ])
])
</script>

<template>
  <h2>Environment data</h2>
  <div>
    <sensor-data v-for="(sensor, index) in sensors" :key="index" :sensor="sensor" />
  </div>
</template>

<style scoped lang="scss"></style>
