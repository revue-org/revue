<script setup lang="ts">
import type { Sensor } from '@domain/device/core/Sensor'
import { Measure } from '@domain/device/core/impl/enum/Measure'
import { MeasureUnit } from '@domain/device/core/impl/enum/MeasureUnit'

import { EnvironmentDataImpl } from '@domain/device/core/impl/EnvironmentDataImpl'

import { EnvironmentDataFactoryImpl } from '@domain/device/factories/impl/EnvironmentDataFactoryImpl'
import type { EnvironmentData } from '@domain/device/core/EnvironmentData'

const { sensor } = defineProps<{
  sensor: Sensor;
}>();
const environmentDataFactory = new EnvironmentDataFactoryImpl();
const data: EnvironmentData[] = [
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    20,
    Measure.PRESSURE, MeasureUnit.PASCAL, new Date()
  ),
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    10,
    Measure.HUMIDITY,
    MeasureUnit.PERCENTAGE
  ),
  new EnvironmentDataImpl(
    sensor.deviceId,
    20,
    Measure.PRESSURE,
    MeasureUnit.PASCAL,
    new Date()
  ),
];

</script>

<template>
  <li>
    <h3>{{ sensor.deviceId.code }}</h3>
    <div v-for="value in data">
      <span>{{ Measure[value.measure] }}: {{ value.value }} {{ MeasureUnit[value.measureUnit] }}</span>
      <span>{{ value.timestamp  }}</span>
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
