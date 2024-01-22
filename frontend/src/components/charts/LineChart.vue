<script setup lang="ts">
import { Line } from 'vue-chartjs'
import type { Device, EnvironmentData } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { EnvironmentDataFactoryImpl, DeviceFactoryImpl,DeviceIdFactoryImpl } from '@domain/device/factories'
import { Measure, MeasureUnit } from '@domain/device/core'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'

defineProps<{
  device: Device
}>()

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
}

const chartOptions = {
  responsive: true
}

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()

const sensor = deviceFactory.createSensor(
  deviceIdFactory.createSensorId('Sensor 1'),
  '192.168.1.10',
  5,
  [Measure.HUMIDITY, Measure.TEMPERATURE, Measure.PRESSURE]
)
const environmentDataFactory = new EnvironmentDataFactoryImpl()
const data: EnvironmentData[] = [
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    20,
    Measure.PRESSURE,
    MeasureUnit.PASCAL
  ),
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    20,
    Measure.PRESSURE,
    MeasureUnit.PASCAL
  ),
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    20,
    Measure.PRESSURE,
    MeasureUnit.PASCAL
  )
]
</script>

<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<style scoped lang="scss"></style>
