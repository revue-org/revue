<script setup lang="ts">
import type { EnvironmentData, Sensor } from '@domain/device/core'
import { Measure } from '@domain/device/core'
import { getMeasureAcronym, getMeasureColor } from '@/utils/MeasureUtils'

defineProps<{
  sensorData: { sensor: Sensor; values: EnvironmentData[] }
}>()
</script>

<template>
  <li>
    <h3>
      {{ sensorData.sensor.deviceId.code }}
    </h3>
    <div class="measures">
      <div v-for="value in sensorData.values">
        <span
          ><i
            :style="{
              color: getMeasureColor(value.measure)
            }"
            >{{ Measure[value.measure] }}</i
          >
          :
          {{ value.value }}{{ getMeasureAcronym(value.measureUnit) }}</span
        >
        <span class="timestamp">{{ value.timestamp.toLocaleString().split(' ')[1] }}</span>
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
