<script lang="ts">
export class Sensor {
  private _deviceId: string
  private _ipAddress: string
  private _isCapturing: boolean
  private _intervalMillis: number
  private _measures: Set<string>

  constructor(
    deviceId: string,
    ipAddress: string,
    intervalMillis: number,
    measures: Set<string>
  ) {
    this._deviceId = deviceId
    this._ipAddress = ipAddress
    this._isCapturing = true
    this._intervalMillis = intervalMillis
    this._measures = measures
  }

  get deviceId(): string {
    return this._deviceId
  }

  get ipAddress(): string {
    return this._ipAddress
  }

  get isCapturing(): boolean {
    return this._isCapturing
  }

  set isCapturing(bool: boolean) {
    this._isCapturing = bool
  }

  get intervalMillis(): number {
    return this._intervalMillis
  }

  get measures(): Set<string> {
    return this._measures
  }
}
</script>
<script setup lang="ts">
import SensorBadge from '@/components/SensorBadge.vue'

import { ref } from 'vue'

const sensors: ref<Sensor[]> = ref([
  new Sensor(
    'Device Id 1',
    '192.168.1.10',
    5,
    new Set(['HUMIDITY', 'TEMPERATURE', 'PRESSURE'])
  ),
  new Sensor(
    'Device Id 2',
    '192.168.1.12',
    10,
    new Set(['HUMIDITY', 'TEMPERATURE'])
  )
])

const deleteSensor = (sensor: Sensor) => {
  const index = sensors.value.findIndex(
    (s: Sensor) => s.deviceId === sensor.deviceId
  )
  if (index !== -1) {
    sensors.value.splice(index, 1)
  }
}
</script>

<template>
  <!--  <header>-->
  <!--    <NavbarComponent />-->
  <!--  </header>-->
  <!--  <main>-->
      <sensor-badge
        v-for="sensor in sensors"
        :key="sensor.deviceId"
        :sensor="sensor"
        @delete-sensor="deleteSensor"
      />
  <!--  </main>-->
  <!--  <aside>-->
  <!--    <AsideComponent />-->
  <!--  </aside>-->
</template>

