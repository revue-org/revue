<script setup lang="ts">
import type { EnvironmentData, Sensor } from '@domain/device/core'
import { Measure } from '@domain/device/core'
import { getMeasureAcronym, getMeasureColor } from '@/utils/MeasureUtils'
import LineChart from '@/components/charts/LineChart.vue'
import { ref, watch } from 'vue'

const { sensorData } = defineProps<{
  sensorData: { sensor: Sensor; values: EnvironmentData[] }
}>()

const bufferLength: number = 20
const removeIfFull = (buffer: any[]): any[] => {
  if (buffer.length > bufferLength) {
    return buffer.shift()
  } else {
    return buffer
  }
}
let temperatureBuffer: number[] = []
let humidityBuffer: number[] = []
let pressureBuffer: number[] = []
let timestampsBuffer: string[] = []

watch(sensorData, newSensorData => {
  newSensorData.values.forEach(value => {
    switch (value.measure) {
      case Measure.TEMPERATURE:
        removeIfFull(temperatureBuffer)
        temperatureBuffer.push(value.value)
        break
      case Measure.HUMIDITY:
        removeIfFull(humidityBuffer)
        humidityBuffer.push(value.value)
        break
      case Measure.PRESSURE:
        removeIfFull(pressureBuffer)
        pressureBuffer.push(value.value)
        break
    }
    removeIfFull(timestampsBuffer)
    timestampsBuffer.push(value.timestamp.toLocaleString().split(' ')[1])

    chartData.value = {
      labels: timestampsBuffer as never[],
      datasets: [
        {
          label: 'Temperature',
          borderColor: 'red',
          data: temperatureBuffer as never[]
        },
        {
          label: 'Humidity',
          borderColor: 'orange',
          data: humidityBuffer as never[]
        },
        {
          label: 'Pressure',
          borderColor: 'teal',
          data: pressureBuffer as never[]
        }
      ]
    }
  })
})

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Temperature',
      borderColor: 'red',
      data: []
    },
    {
      label: 'Humidity',
      borderColor: 'orange',
      data: [],
      hidden: true
    },
    {
      label: 'Pressure',
      borderColor: 'teal',
      data: [],
      hidden: true
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
})
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
    <div class="chart-container">
      <line-chart :chart-data="chartData" :chart-options="chartOptions" />
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

    div {
      width: 180px;
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
