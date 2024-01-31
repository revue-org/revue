<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, type Ref, ref } from 'vue'
import { type EnvironmentData, Measure, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, EnvironmentDataFactoryImpl } from '@domain/device/factories'
import SensorData from '@/components/devices/SensorData.vue'
import RequestHelper, { alarmHost, alarmPort, monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { alarmSocket, monitoringSocket } from '@/socket'
import { useQuasar } from 'quasar'
import router from '@/router'
import { AnomalyTypeConverter, MeasureConverter } from 'domain/dist/utils'
import { AnomalyType } from 'domain/dist/domain/anomaly/core'
import { useTopicsStore } from '@/stores/topics'
import { type AxiosResponse, HttpStatusCode } from 'axios'

const topicsStore = useTopicsStore()

const $q = useQuasar()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()

let values: Ref<{ sensor: Sensor; values: EnvironmentData[] }[]> = ref([])

RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/sensors`).then((res: AxiosResponse) => {
  if (res.status == HttpStatusCode.Ok) {
    for (let i = 0; i < res.data.length; i++) {
      const sensor = composeSensor(res.data[i])
      values.value.push({
        sensor: sensor,
        values: []
      })
    }
  }
})

const environmentDataFactory = new EnvironmentDataFactoryImpl()

const composeSensor = (sensor: any): Sensor => {
  console.log(composeMeasure(sensor.measures))
  return deviceFactory.createSensor(
    deviceIdFactory.createSensorId(sensor._id.code),
    sensor.ipAddress,
    sensor.intervalMillis,
    composeMeasure(sensor.measures)
  )
}

function composeMeasure(measures: any): Measure[] {
  return measures.map((measure: any) => {
    return MeasureConverter.convertToMeasure(measure)
  })
}

onBeforeMount(() => {
  console.log('resume' + topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
  monitoringSocket.emit(
    'resume',
    topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_'))
  )
})

onBeforeUnmount(() => {
  console.log('pause' + topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_')))
  monitoringSocket.emit(
    'pause',
    topicsStore.subscribedTopics.filter((topic: string) => topic.startsWith('SENSOR_'))
  )
})

monitoringSocket.on('env-data', (data: { topic: string; data: string }) => {
  const rawValues = JSON.parse(data.data)
  const newValues: EnvironmentData[] = []
  for (const rawValue of rawValues) {
    newValues.push(
      environmentDataFactory.createEnvironmentData(
        deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
        rawValue._value,
        rawValue._measure,
        rawValue._measureUnit
      )
    )
  }
  const index = values.value.findIndex(
    (item: { sensor: Sensor; values: EnvironmentData[] }) =>
      item.sensor.deviceId.code === newValues[0].sourceDeviceId.code
  )
  if (index !== -1) {
    values.value[index].values = newValues
  }
})

const simulateExceeding = async () => {
  await RequestHelper.post(`http://${alarmHost}:${alarmPort}/simulations/exceedings`, {
    anomalyId: '65b514200718dbb3580fb9e6',
    deviceId: {
      type: 'SENSOR',
      code: 'sen-01'
    },
    measure: 'TEMPERATURE',
    value: 100
  })
    .then((res: any) => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
}

const simulateIntrusion = async () => {
  await RequestHelper.post(`http://${alarmHost}:${alarmPort}/simulations/intrusions`, {
    anomalyId: '65b514200718dbb3580fb9e6', //to create a new anomaly
    deviceId: {
      type: 'CAMERA',
      code: 'cam-01'
    },
    intrusionObject: 'PERSON'
  })
    .then((res: any) => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
}

alarmSocket.on('notification', (anomaly: string) => {
  const anomalyType: AnomalyType = AnomalyTypeConverter.convertToAnomalyType(anomaly.type)
  switch (anomalyType) {
    case AnomalyType.EXCEEDING:
      showNotification('Exceeding notification', anomalyType)
      break
    case AnomalyType.INTRUSION:
      showNotification('Intrusion notification', anomalyType)
      break
    default:
      break
  }
})

const showNotification = (message: string, type: AnomalyType) => {
  $q.notify({
    message: message,
    color: 'primary',
    avatar:
      type == AnomalyType.INTRUSION
        ? '../assets/notificationIcons/intrusion.png'
        : '../assets/notificationIcons/exceeding.png',
    actions: [
      {
        label: 'Dismiss',
        color: 'white',
        handler: () => {}
      },
      {
        label: 'Read',
        color: 'green',
        handler: () => {
          router.push('/notifications')
        }
      }
    ]
  })
}
</script>
<template>
  <button class="btn btn-primary" @click="simulateExceeding">Simulate Exceeding</button>
  <button class="btn btn-primary" @click="simulateIntrusion">Simulate Intrusion</button>

  <h2>Environment data</h2>
  <div>
    <sensor-data v-for="(value, index) in values" :key="index" :sensor-data="value" />
  </div>
</template>

<style scoped lang="scss"></style>
