<script setup lang="ts">
import { ref } from 'vue'
import { Measure, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl } from '@domain/device/factories'
import SensorData from '@/components/devices/SensorData.vue'
import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import { alarmSocket } from '@/socket'

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

const simulateExceeding = async () => {
  console.log('ciao')
  await RequestHelper.post(`http://${alarmHost}:${alarmPort}/simulations/exceedings`, {
    anomalyId: '65b514200718dbb3580fb9e6',
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    measure: 'TEMPERATURE',
    value: 100
  })
    .then((res: any) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}

const simulateIntrusion = async () => {
  console.log('ciao')
  await RequestHelper.post(`http://${alarmHost}:${alarmPort}/simulations/intrusions`, {
    anomalyId: '65b514200718dbb3580fb9e6',
    deviceId: {
      type: 'CAMERA',
      code: 'cam-01'
    },
    intrusionObject: 'PERSON'
  })
    .then((res: any) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}

alarmSocket.on('exceeding', (newExceeding: { new: boolean }) => {
  alert('new Exceeding notification')
})

alarmSocket.on('intrusion', (newIntrusion: { new: boolean }) => {
  alert('new Intrusion notification')
})
</script>
<template>
  <button class="btn btn-primary" @click="simulateExceeding">Simulate Exceeding</button>
  <button class="btn btn-primary" @click="simulateIntrusion">Simulate Intrusion</button>

  <h2>Environment data</h2>
  <div>
    <sensor-data v-for="(sensor, index) in sensors" :key="index" :sensor="sensor" />
  </div>
</template>

<style scoped lang="scss"></style>
