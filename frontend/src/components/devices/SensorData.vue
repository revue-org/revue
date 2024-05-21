<script setup lang="ts">
import { type EnvironmentData, Measure, type Sensor } from '@domain/device/core'
import { getMeasureAcronym, getMeasureColor } from '@/utils/MeasureUtils'
import LineChart from '@/components/charts/LineChart.vue'
import { onMounted, ref, toRaw, watch } from 'vue'
import RequestHelper, { logHost, logPort } from '@/utils/RequestHelper'
import { HttpStatusCode } from 'axios'
import { MeasureConverter, MeasureUnitConverter } from 'domain/dist/utils'
import { EnvironmentDataFactoryImpl } from 'domain/dist/domain/device/factories'

const props = defineProps<{
  sensor: Sensor
  lastData: EnvironmentData[]
}>()

let bufferLength: number
const temperatureBuffer: { value: number; timestamp: string }[] = []
const humidityBuffer: { value: number; timestamp: string }[] = []
const pressureBuffer: { value: number; timestamp: string }[] = []

const environmentData = ref<EnvironmentData[]>([])
const currentMeasure = ref<Measure>(Measure.TEMPERATURE)

const environmentDataFactory = new EnvironmentDataFactoryImpl()

console.log('SensorData')

const getSensorData = async () => {
  const quantity: number = bufferLength * 3
  const response = await RequestHelper.get(
    `http://${logHost}:${logPort}/sensors/${props.sensor.deviceId.code}/environment-data/latest?quantity=${quantity}`
  )
  if (response.status == HttpStatusCode.Ok) {
    for (let j = 0; j < response.data.length; j++) {
      const envData = environmentDataFactory.createEnvironmentData(
        props.sensor.deviceId,
        response.data[j].value,
        MeasureConverter.convertToMeasure(response.data[j].measure),
        MeasureUnitConverter.convertToMeasureUnit(response.data[j].measureUnit),
        new Date(response.data[j].timestamp)
      )
      environmentData.value.push(envData)
      addMeasureValue(envData.measure, envData.value, envData.timestamp)
    }
  }
}

onMounted(() => {
  getSensorData()
  window.addEventListener('resize', handleResize)
  console.log('SensorData mounted')
})

watch(
  () => props.lastData,
  () => {
    console.log('SensorData changed')
    console.log(props.lastData)
    for (const envData of props.lastData) {
      addMeasureValue(envData.measure, envData.value, envData.timestamp)
    }
  }
)

const removeIfFull = (buffer: any[]): void => {
  console.log('removeIfFull')
  console.log(buffer.length, ' ', bufferLength)
  while (buffer.length > bufferLength) {
    buffer.shift()
  }
}

const addMeasureValue = (measure: Measure, value: number, timestamp: Date) => {
  const timestampStr = timestamp.toLocaleString().split(' ')[1]
  switch (measure) {
    case Measure.TEMPERATURE:
      removeIfFull(temperatureBuffer)
      temperatureBuffer.push({ value: value, timestamp: timestampStr })
      break
    case Measure.HUMIDITY:
      removeIfFull(humidityBuffer)
      humidityBuffer.push({ value: value, timestamp: timestampStr })
      break
    case Measure.PRESSURE:
      removeIfFull(pressureBuffer)
      pressureBuffer.push({ value: value, timestamp: timestampStr })
      break
  }
  renderValues()
}

const renderValues = () => {
  temperatureData.value = {
    labels: toRaw(temperatureBuffer.map(obj => obj.timestamp)) as never[],
    datasets: [
      {
        label: 'Temperature',
        borderColor: 'red',
        data: toRaw(temperatureBuffer.map(obj => obj.value)) as never[]
      }
    ]
  }
  humidityData.value = {
    labels: toRaw(humidityBuffer.map(obj => obj.timestamp)) as never[],
    datasets: [
      {
        label: 'Humidity',
        borderColor: 'teal',
        data: toRaw(humidityBuffer.map(obj => obj.value)) as never[]
      }
    ]
  }
  pressureData.value = {
    labels: toRaw(pressureBuffer.map(obj => obj.timestamp)) as never[],
    datasets: [
      {
        label: 'Pressure',
        borderColor: 'orange',
        data: toRaw(pressureBuffer.map(obj => obj.value)) as never[]
      }
    ]
  }
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

const handleResize = () => {
  if (window.innerWidth < 576) {
    bufferLength = 80
  } else if (window.innerWidth < 768) {
    bufferLength = 120
  } else if (window.innerWidth < 992) {
    bufferLength = 150
  } else if (window.innerWidth < 1200) {
    bufferLength = 170
  } else {
    bufferLength = 200
  }
  removeIfFull(temperatureBuffer)
  removeIfFull(humidityBuffer)
  removeIfFull(pressureBuffer)
}
handleResize()
</script>

<template>
  <li>
    <h3>
      {{ sensor.deviceId.code }}
    </h3>
    <div class="measures">
      <div class="measure" v-for="(envData, index) in lastData" :key="index">
        <q-radio dense v-model="currentMeasure" :val="envData.measure" label="" />
        <div>
          <span>
            <i
              :style="{
                color: getMeasureColor(envData.measure)
              }"
              >{{ Measure[envData.measure] }}</i
            >
            :
            {{ envData.value }}{{ getMeasureAcronym(envData.measureUnit) }}</span
          >
          <span class="timestamp">{{ envData.timestamp.toLocaleString().split(' ')[1] }}</span>
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
