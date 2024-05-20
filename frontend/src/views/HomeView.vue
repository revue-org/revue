<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, type Ref, ref } from 'vue'
import { DeviceType, type EnvironmentData, Measure, type Sensor } from '@domain/device/core'
import type { DeviceIdFactory } from '@domain/device/factories'
import { DeviceIdFactoryImpl, EnvironmentDataFactoryImpl } from '@domain/device/factories'
import SensorData from '@/components/devices/SensorData.vue'
import RequestHelper, { logHost, logPort, monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { monitoringSocket, notificationSocket, setupSocketServers } from '@/socket'
import { useQuasar } from 'quasar'
import router from '@/router'
import { AnomalyTypeConverter, DeviceTypeConverter } from 'domain/dist/utils'
import { AnomalyType } from 'domain/dist/domain/alarm-system/core'
import { useTopicsStore } from '@/stores/topics'
import { useUserStore } from '@/stores/user'
import { type AxiosResponse, HttpStatusCode } from 'axios'
import { composeSensor } from '@/scripts/presentation/device/ComposeDevice'
import type { SensorMeasures } from '@/utils/types'

const topicsStore = useTopicsStore()
const userStore = useUserStore()
// const bufferStore = useBuffersStore()

const $q = useQuasar()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

let sensors: Ref<SensorMeasures[]> = ref([])

if (monitoringSocket == undefined || notificationSocket == undefined) {
  setupSocketServers(userStore.accessToken)
}

RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/sensors`).then(
  async (res: AxiosResponse) => {
    if (res.status == HttpStatusCode.Ok) {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].isCapturing) {
          const sensor = composeSensor(res.data[i])
          const quantity: number = 50
          const response = await RequestHelper.get(
            `http://${logHost}:${logPort}/sensors/${sensor.deviceId.code}/environment-data/latest?quantity=${quantity}`
          )
          if (response.status == HttpStatusCode.Ok) {
            const temperatureData: EnvironmentData[] = []
            const humidityData: EnvironmentData[] = []
            const pressureData: EnvironmentData[] = []
            for (let j = 0; j < response.data.length; j++) {
              const envData = environmentDataFactory.createEnvironmentData(
                sensor.deviceId,
                response.data[j].value,
                response.data[j].measure,
                response.data[j].measureUnit,
                new Date(response.data[j].timestamp)
              )
              switch (envData.measure) {
                case Measure.TEMPERATURE:
                  temperatureData.push(envData)
                  break
                case Measure.HUMIDITY:
                  humidityData.push(envData)
                  break
                case Measure.PRESSURE:
                  pressureData.push(envData)
                  break
              }
              // updateSensorValues([envData])
            }
            sensors.value.push({
              sensor: sensor,
              measures: [
                { measure: Measure.TEMPERATURE, data: temperatureData },
                { measure: Measure.HUMIDITY, data: humidityData },
                { measure: Measure.PRESSURE, data: pressureData }
              ]
            })
          }
        }
      }
    }
  }
)

const environmentDataFactory = new EnvironmentDataFactoryImpl()

onBeforeMount(() => {
  monitoringSocket?.emit(
    'resume',
    topicsStore.subscribedTopics.filter((topic: string) =>
      topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.SENSOR))
    )
  )
})

onBeforeUnmount(() => {
  monitoringSocket?.emit(
    'pause',
    topicsStore.subscribedTopics.filter((topic: string) =>
      topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.SENSOR))
    )
  )
})

monitoringSocket?.on('env-data', (data: { topic: string; data: string }) => {
  const rawValues = JSON.parse(data.data)
  const newValues: EnvironmentData[] = []
  for (const rawValue of rawValues) {
    newValues.push(
      environmentDataFactory.createEnvironmentData(
        deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
        rawValue._value,
        rawValue._measure,
        rawValue._measureUnit,
        rawValue._timestamp
      )
    )
  }
  // updateSensorValues(newValues)
})

const updateSensorValues = (newValues: EnvironmentData[]) => {
  const index = sensors.value.findIndex(
    (item: { sensor: Sensor; values: EnvironmentData[] }) =>
      item.sensor.deviceId.code === newValues[0].sourceDeviceId.code
  )
  if (index !== -1) {
    sensors.value[index].values = newValues
  }
}

if (notificationSocket?.listeners('notification').length === 0) {
  notificationSocket?.on('notification', (anomaly: { type: string }) => {
    switch (AnomalyTypeConverter.convertToAnomalyType(anomaly.type)) {
      case AnomalyType.EXCEEDING:
        showNotification('Exceeding notification')
        break
      case AnomalyType.INTRUSION:
        showNotification('Intrusion notification')
        break
      default:
        break
    }
  })
}

const showNotification = (message: string) => {
  $q.notify({
    message: message,
    color: 'primary',
    icon: 'mark_unread_chat_alt',
    actions: [
      {
        label: 'Dismiss',
        color: 'white',
        handler: () => {}
      },
      {
        label: 'Read',
        color: 'white',
        handler: () => {
          router.push('/notifications')
        }
      }
    ]
  })
}
</script>
<template>
  <h2>Environment data</h2>
  <div>
    <sensor-data
      v-for="(value, index) in sensors.filter(value_ => value_.sensor.isCapturing)"
      :key="index"
      :sensor-data="value"
    />
  </div>
</template>

<style scoped lang="scss"></style>
