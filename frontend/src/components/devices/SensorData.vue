<script setup lang="ts">
import type { Sensor } from "@domain/device/core/Sensor";
import { Measure } from "domain/dist/domain/device/core/impl/enum/Measure";
import { EnvironmentDataFactoryImpl } from "@domain/device/factories/impl/EnvironmentDataFactoryImpl";
import type { EnvironmentData } from "domain/dist/domain/device/core/EnvironmentData";

const { sensor } = defineProps<{
  sensor: Sensor;
}>();
const environmentDataFactory = new EnvironmentDataFactoryImpl();
const data: EnvironmentData[] = [
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    2,
    Measure.PRESSURE,
    new Date(),
  ),
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    10,
    Measure.HUMIDITY,
  ),
];
</script>

<template>
  <li>
    <h3>{{ sensor.deviceId.code }}</h3>
    <div v-for="(value, index) in data" :key="index">
      <span>{{ Measure[value.measure] }}: {{ value.value }}</span>
      <span>{{ value.timestamp.toLocaleString() }}</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
li {
  list-style: none;
  border-bottom: #00acc1 1px solid;
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
