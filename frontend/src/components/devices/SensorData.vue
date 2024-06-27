<script setup lang="ts">
import LineChart from '@/components/charts/LineChart.vue'
import { type Measurement, MeasureType } from 'common/dist/domain/core'
import { ref } from 'vue'
import type { Device } from '@/domain/core/Device'
import { monitoringSocket } from '@/socket'
import { composeMeasurement } from '@/presentation/ComposeMeasurement'
import { chartOptions } from '@/components/charts/chartOptions'
import { colorMap } from '@/utils/MeasureUtils'

const props = defineProps<{
  sensor: Device
}>()

const currentMeasure = ref<MeasureType>(MeasureType.TEMPERATURE)
const bufferLength = 50

const measureData = ref<
  Record<MeasureType, { buffer: { value: number; timestamp: string; unit: string }[] }>
>(Object.fromEntries(Object.values(MeasureType).map(type => [type, { buffer: [] }])))

const removeIfFull = (buffer: any[]): void => {
  while (buffer.length > bufferLength) {
    buffer.shift()
  }
}

const addMeasureValue = (measurement: Measurement) => {
  const measure = measureData.value[measurement.measure.type]
  removeIfFull(measure.buffer)
  measure.buffer.push({
    value: measurement.value,
    timestamp: measurement.timestamp.toLocaleString().split(' ')[1],
    unit: measurement.measure.unit
  })
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
  addMeasureValue(measurement)
})

const measureTypes = ref<MeasureType[]>(Object.values(MeasureType))
</script>

<template>
  <li>
    <h3>{{ sensor.deviceId }}</h3>
    <div class="measures">
      <div class="measure" v-for="(type, index) in measureTypes" :key="index">
        <q-radio
          dense
          v-model="currentMeasure"
          :val="type"
          :label="type.toUpperCase()"
          :style="{ color: colorMap[type] }"
          v-show="measureData[type].buffer.length > 0"
        />
      </div>
      <div class="lastUpdate">
        Last update:
        {{ measureData[currentMeasure].buffer[measureData[currentMeasure].buffer.length - 1].value }}
        {{ measureData[currentMeasure].buffer[measureData[currentMeasure].buffer.length - 1].unit }}
        at: {{ measureData[currentMeasure].buffer[measureData[currentMeasure].buffer.length - 1].timestamp }}
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
      flex-direction: column;
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

    .lastUpdate {
      font-size: 0.8rem;
      color: black;
    }
  }
}
</style>
