<script setup lang="ts">
import LineChart from '@/components/charts/LineChart.vue'
import { MeasureType } from 'common/dist/domain/core'
import { ref } from "vue";
import type { Sensor } from '@/domain/core/Sensor'
import { monitoringSocket } from "@/socket";
import { composeMeasurement } from "@/presentation/ComposeMeasurement";
import { chartOptions } from "@/components/charts/chartOptions";

const props = defineProps<{
  sensor: Sensor
}>()

const currentMeasure = ref<MeasureType>(MeasureType.TEMPERATURE)
const bufferLength = 50

const colorMap = {
  [MeasureType.TEMPERATURE]: 'red',
  [MeasureType.HUMIDITY]: 'teal',
  [MeasureType.PRESSURE]: 'orange'
}

const measureData = ref<Record<MeasureType, { buffer: { value: number, timestamp: string }[] }>>(
  Object.fromEntries(Object.values(MeasureType).map(type => [type, { buffer: [] }]))
)

const removeIfFull = (buffer: any[]): void => {
  while (buffer.length > bufferLength) {
    buffer.shift()
  }
}

const addMeasureValue = (measureType: MeasureType, value: number, timestamp: Date) => {
  const timestampStr = timestamp.toLocaleString().split(' ')[1]
  const measure = measureData.value[measureType]
  removeIfFull(measure.buffer)
  measure.buffer.push({ value, timestamp: timestampStr })
}

const getChartData = (measureType: MeasureType) => {
  const measure = measureData.value[measureType]
  return {
    labels: measure.buffer.map(obj => obj.timestamp),
    datasets: [
      {
        label: measureType.charAt(0) + measureType.slice(1).toLowerCase(),
        borderColor: colorMap[measureType],
        data: measure.buffer.map(obj => obj.value)
      }
    ]
  }
}

monitoringSocket?.on(`measurements.${props.sensor.deviceId}`, (data: { measurement: any }) => {
  const measurement = composeMeasurement(data.measurement)
  addMeasureValue(measurement.measure.type, measurement.value, measurement.timestamp)
})


const measureTypes = ref<MeasureType[]>(Object.values(MeasureType))

</script>

<template>
  <li>
    <h3>{{ sensor.deviceId }}</h3>
    <div class="measures">
      <div class="measure" v-for="(type, index) in measureTypes" :key="index">
        <q-radio dense v-model="currentMeasure" :val="type" :label="type" />
      </div>
    </div>
    <div class="chart-container">
      <line-chart
        v-for="type in measureTypes"
        v-show="currentMeasure === type"
        :key="type"
        :chart-data="getChartData(type)"
        :chart-options="chartOptions"
      />
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

  @media screen and (max-width: 756px) {
    flex-wrap: wrap;
  }

  div.chart-container {
    flex-grow: 1;
    height: 100px;

    canvas {
      max-width: 100%;
    }
  }

  div.measures {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    width: 220px;

    div.measure {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }

    @media screen and (max-width: 576px) {
      flex-direction: column;
      gap: 5px;
    }
  }

  h3 {
    flex-basis: 200px;
    line-height: 1.5;

    @media screen and (max-width: 756px) {
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
