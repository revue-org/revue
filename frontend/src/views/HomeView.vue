<script setup lang="ts">
import type { Sensor } from "@domain/device/core/Sensor";
import { ref } from "vue";
import { Measure } from "@domain/device/core/impl/enum/Measure";
import type { DeviceIdFactory } from "@domain/device/factories/DeviceIdFactory";
import { DeviceIdFactoryImpl } from "@domain/device/factories/impl/DeviceIdFactoryImpl";
import type { DeviceFactory } from "@domain/device/factories/DeviceFactory";
import { DeviceFactoryImpl } from "@domain/device/factories/impl/DeviceFactoryImpl";
import SensorData from "@/components/devices/SensorData.vue";

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl();
const deviceFactory: DeviceFactory = new DeviceFactoryImpl();

const sensors: ref<Sensor[]> = ref([
  deviceFactory.createSensor(
    deviceIdFactory.createSensorId("Sensor 1"),
    "192.168.1.10",
    5,
    [Measure.HUMIDITY, Measure.TEMPERATURE, Measure.PRESSURE],
  ),
  deviceFactory.createSensor(
    deviceIdFactory.createSensorId("Sensor 2"),
    "192.168.1.11",
    5,
    [Measure.TEMPERATURE, Measure.PRESSURE],
  ),
]);
</script>

<template>
  <div class="container">
    <h2>Environment data</h2>
    <div>
      <sensor-data
        v-for="(sensor, index) in sensors"
        :key="index"
        :sensor="sensor"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
div.container {
  margin: 1rem;
}
</style>
