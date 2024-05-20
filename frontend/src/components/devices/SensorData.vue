<script setup lang="ts">
import { Measure } from '@domain/device/core'
import { getMeasureAcronym, getMeasureColor } from '@/utils/MeasureUtils'
import LineChart from '@/components/charts/LineChart.vue'
import { onMounted, ref, toRaw, watch } from 'vue'
import { useBuffersStore } from '@/stores/buffers'
import type { SensorMeasures } from '@/utils/types'

const { sensorData } = defineProps<{
  sensorData: SensorMeasures
}>()

console.log('SensorData')
console.log(sensorData)

const bufferStore = useBuffersStore()

onMounted(() => {
  window.addEventListener('resize', handleResize)
  console.log('SensorData mounted')
  console.log(sensorData)
  for (const obj of sensorData.measures) {
    const measure = obj.measure
    const environmentData = obj.data
    console.log(obj)
    for (const data of environmentData) {
      addMeasureValue(measure, data.value, data.timestamp)
    }
  }
})

// watch(sensorData, newSensorData => {
//   console.log('SensorData changed')
//   console.log(sensorData)
//   addMeasureValue(
//     newSensorData.measures[0].measure,
//     newSensorData.measures[0].data[0].value,
//     newSensorData.measures[0].data[0].timestamp
//   )
// })

const removeIfFull = (buffer: any[]): void => {
  while (buffer.length > bufferStore.bufferLength) {
    buffer.shift()
  }
}

const addMeasureValue = (measure: Measure, value: number, timestamp: Date) => {
  const timestampStr = timestamp.toLocaleString().split(' ')[1]
  switch (measure) {
    case Measure.TEMPERATURE:
      removeIfFull(bufferStore.temperatureBuffer)
      bufferStore.temperatureBuffer.push({ value: value, timestamp: timestampStr })
      break
    case Measure.HUMIDITY:
      removeIfFull(bufferStore.humidityBuffer)
      bufferStore.humidityBuffer.push({ value: value, timestamp: timestampStr })
      break
    case Measure.PRESSURE:
      removeIfFull(bufferStore.pressureBuffer)
      bufferStore.pressureBuffer.push({ value: value, timestamp: timestampStr })
      break
  }
  renderValues()
}

// const addValues = (newSensorData: SensorData) => {
//   newSensorData.measures.forEach(obj => {
//     const measure = obj.measure
//     const environmentData = obj.data
//     const timestamp = obj.timestamp.toLocaleString().split(' ')[1]
//     switch (measure) {
//       case Measure.TEMPERATURE:
//         removeIfFull(bufferStore.temperatureBuffer)
//         bufferStore.temperatureBuffer.push({ value: obj.value, timestamp: timestamp })
//         break
//       case Measure.HUMIDITY:
//         removeIfFull(bufferStore.humidityBuffer)
//         bufferStore.humidityBuffer.push({ value: obj.value, timestamp: timestamp })
//         break
//       case Measure.PRESSURE:
//         removeIfFull(bufferStore.pressureBuffer)
//         bufferStore.pressureBuffer.push({ value: obj.value, timestamp: timestamp })
//         break
//     }
//     renderValues()
//   })
// }

const renderValues = () => {
  temperatureData.value = {
    labels: toRaw(bufferStore.temperatureBuffer.map(obj => obj.timestamp)) as never[],
    datasets: [
      {
        label: 'Temperature',
        borderColor: 'red',
        data: toRaw(bufferStore.temperatureBuffer.map(obj => obj.value)) as never[]
      }
    ]
  }
  humidityData.value = {
    labels: toRaw(bufferStore.humidityBuffer.map(obj => obj.timestamp)) as never[],
    datasets: [
      {
        label: 'Humidity',
        borderColor: 'teal',
        data: toRaw(bufferStore.humidityBuffer.map(obj => obj.value)) as never[]
      }
    ]
  }
  pressureData.value = {
    labels: toRaw(bufferStore.pressureBuffer.map(obj => obj.timestamp)) as never[],
    datasets: [
      {
        label: 'Pressure',
        borderColor: 'orange',
        data: toRaw(bufferStore.pressureBuffer.map(obj => obj.value)) as never[]
      }
    ]
  }
  console.log('renderValues')
  console.log(temperatureData.value)
  console.log(humidityData.value)
  console.log(pressureData.value)
}

const temperatureData = ref({
  labels: [],
  datasets: [
    {
      label: 'Temperature',
      borderColor: 'red',
      data: []
    }
  ]
})

const humidityData = ref({
  labels: [],
  datasets: [
    {
      label: 'Humidity',
      borderColor: 'teal',
      data: []
    }
  ]
})

const pressureData = ref({
  labels: [],
  datasets: [
    {
      label: 'Pressure',
      borderColor: 'orange',
      data: []
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
const currentMeasure = ref<Measure>(Measure.TEMPERATURE)

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
}
</script>

<template>
  <li>
    <h3>
      {{ sensorData.sensor.deviceId.code }}
    </h3>
    <div class="measures">
      <div
        class="measure"
        v-for="value in sensorData.measures"
        :key="value.data.pop() + Math.random().toString(36).substring(3)"
      >
        <div v-if="value.data.length > 0">
          <q-radio dense v-model="currentMeasure" :val="value.measure" label="" />
          <div>
            <span>
              <i
                :style="{
                  color: getMeasureColor(value.measure)
                }"
                >{{ Measure[value.measure] }}</i
              >
              :
              {{ value.data.pop()?.value }}{{ getMeasureAcronym(value.data.pop()!.measureUnit) }}</span
            >
            <span class="timestamp">{{ value.data.pop()?.timestamp.toLocaleString().split(' ')[1] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <line-chart
        v-show="currentMeasure == Measure.TEMPERATURE"
        :chart-data="temperatureData"
        :chart-options="chartOptions"
      />
      <line-chart
        v-show="currentMeasure == Measure.HUMIDITY"
        :chart-data="humidityData"
        :chart-options="chartOptions"
      />
      <line-chart
        v-show="currentMeasure == Measure.PRESSURE"
        :chart-data="pressureData"
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
