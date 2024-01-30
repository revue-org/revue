<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, type Ref, ref } from 'vue'
import { type EnvironmentData, Measure, MeasureUnit, type Sensor } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory } from '@domain/device/factories'
import { DeviceFactoryImpl, DeviceIdFactoryImpl, EnvironmentDataFactoryImpl } from '@domain/device/factories'
import SensorData from '@/components/devices/SensorData.vue'
import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import { alarmSocket } from '@/socket'
import { useQuasar } from 'quasar'
import router from '@/router'
import { AnomalyTypeConverter } from 'domain/dist/utils'
import { AnomalyType } from 'domain/dist/domain/anomaly/core'
import { monitoringSocket } from '@/socket'
import { useTopicsStore } from '@/stores/topics'

const topicsStore = useTopicsStore()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()

const $q = useQuasar()

const sensors: ref<Sensor[]> = ref([
  deviceFactory.createSensor(deviceIdFactory.createSensorId('sen-01'), '192.168.1.10', 5, [
    Measure.HUMIDITY,
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ]),
  deviceFactory.createSensor(deviceIdFactory.createSensorId('sen-02'), '192.168.1.11', 5, [
    Measure.TEMPERATURE,
    Measure.PRESSURE
  ])
])

const environmentDataFactory = new EnvironmentDataFactoryImpl()

let values = ref(
  sensors.value.map((sensor: Sensor) => {
    return {
      sensor: sensor,
      values: [
        environmentDataFactory.createEnvironmentData(
          sensor.deviceId,
          20,
          Measure.TEMPERATURE,
          MeasureUnit.CELSIUS
        )
      ]
    }
  })
)

const topics: Ref<string[]> = computed(() =>
  sensors.value.map((sensor: Sensor) => 'SENSOR_' + sensor.deviceId.code)
)

onBeforeMount(() => {
  const topicsToSubscribe = topics.value.filter(topic => !topicsStore.subscribedTopics.includes(topic))
  const topicsToResume = topics.value.filter(topic => topicsStore.subscribedTopics.includes(topic))
  if (topicsToSubscribe.length > 0) {
    monitoringSocket.emit('subscribe', topicsToSubscribe)
    topicsToSubscribe.forEach(topic => topicsStore.addTopic(topic))
  }
  if (topicsToResume.length > 0) {
    monitoringSocket.emit('resume', topicsToResume)
  }
})

onBeforeUnmount(() => {
  monitoringSocket.emit('pause', topics.value)
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
