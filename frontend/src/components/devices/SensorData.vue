<script setup lang="ts">
import type { Sensor } from "@domain/device/core/Sensor";
import { Measure } from "@domain/device/core/impl/enum/Measure";
import { MeasureUnit } from "@domain/device/core/impl/enum/MeasureUnit";
import { EnvironmentDataFactoryImpl } from "@domain/device/factories/impl/EnvironmentDataFactoryImpl";
import type { EnvironmentData } from "@domain/device/core/EnvironmentData";
import { getMeasureAcronym, getMeasureColor } from "@/utils/MeasureUtils";

const { sensor } = defineProps<{
  sensor: Sensor;
}>();
const environmentDataFactory = new EnvironmentDataFactoryImpl();
const data: EnvironmentData[] = [
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    20,
    Measure.PRESSURE,
    MeasureUnit.PASCAL,
  ),
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    10,
    Measure.HUMIDITY,
    MeasureUnit.PERCENTAGE,
  ),
  environmentDataFactory.createEnvironmentData(
    sensor.deviceId,
    30,
    Measure.TEMPERATURE,
    MeasureUnit.FARENHEIT,
  ),
];
</script>

<template>
  <li>
    <h3>{{ sensor.deviceId.code }}</h3>
    <div class="measures">
      <div v-for="value in data">
        <span
          ><i :style="{ color: getMeasureColor(value.measure) }">{{
            Measure[value.measure]
          }}</i>
          : {{ value.value }}{{ getMeasureAcronym(value.measureUnit) }}</span
        >
        <span class="timestamp">{{
          value.timestamp.toLocaleString().split(" ")[1]
        }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
li {
  list-style: none;
  border-bottom: #00acc1 1px solid;
  padding: 10px;
  margin: 0 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  div.measures {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;

    @media screen and (max-width: 576px) {
      flex-direction: column;
      gap: 5px;
    }
  }

  h3 {
    flex-basis: 200px;
    line-height: 1.5;

    @media screen and (max-width: 576px) {
      flex-basis: 100px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .timestamp {
      font-size: 0.7rem;
      color: gray;
    }
  }
}
</style>
