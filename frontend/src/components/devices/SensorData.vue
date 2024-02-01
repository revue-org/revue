<script setup lang="ts">
import type { EnvironmentData, Sensor } from '@domain/device/core'
import { Measure } from '@domain/device/core'
import { getMeasureAcronym, getMeasureColor } from '@/utils/MeasureUtils'
import LineChart from '@/components/charts/LineChart.vue'
import { onMounted, ref, toRaw, watch } from 'vue'
import { useBuffersStore } from '@/stores/buffers'

const { sensorData } = defineProps<{
  sensorData: { sensor: Sensor; values: EnvironmentData[] }
}>()

const bufferStore = useBuffersStore()

const handleResize = () => {
  if (window.innerWidth < 576) {
    bufferStore.bufferLength = 80
  } else if (window.innerWidth < 768) {
    bufferStore.bufferLength = 120
  } else if (window.innerWidth < 992) {
    bufferStore.bufferLength = 150
  } else if (window.innerWidth < 1200) {
    bufferStore.bufferLength = 170
  } else {
    bufferStore.bufferLength = 200
  }
  removeIfFull(bufferStore.temperatureBuffer)
  removeIfFull(bufferStore.humidityBuffer)
  removeIfFull(bufferStore.pressureBuffer)
  console.log(bufferStore.bufferLength)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

const removeIfFull = (buffer: any[]): void => {
  while (buffer.length > bufferStore.bufferLength) {
    buffer.shift()
  }
}

watch(sensorData, newSensorData => {
  newSensorData.values.forEach(value => {
    switch (value.measure) {
      case Measure.TEMPERATURE:
        removeIfFull(bufferStore.temperatureBuffer)
        bufferStore.temperatureBuffer.push(value.value)
        break
      case Measure.HUMIDITY:
        removeIfFull(bufferStore.humidityBuffer)
        bufferStore.humidityBuffer.push(value.value)
        break
      case Measure.PRESSURE:
        removeIfFull(bufferStore.pressureBuffer)
        bufferStore.pressureBuffer.push(value.value)
        break
    }
    removeIfFull(bufferStore.timestampBuffer)
    bufferStore.timestampBuffer.push(value.timestamp.toLocaleString().split(' ')[1])
    chartData.value = {
      labels: toRaw(bufferStore.timestampBuffer) as never[],
      datasets: [
        {
          label: 'Temperature',
          borderColor: 'red',
          data: toRaw(bufferStore.temperatureBuffer) as never[]
        },
        {
          label: 'Humidity',
          borderColor: 'orange',
          data: toRaw(bufferStore.humidityBuffer) as never[]
        },
        {
          label: 'Pressure',
          borderColor: 'teal',
          data: toRaw(bufferStore.pressureBuffer) as never[]
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
  elements: {
    line: {
      borderWidth: 1.5
    },
    point: {
      radius: 0
    }
  },
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
