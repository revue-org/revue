<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { monitoringSocket, notificationSocket, setupSocketServers } from '@/socket'
import { useQuasar } from 'quasar'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import HttpStatusCode from '@utils/HttpStatusCode'
import RequestHelper, { deviceHost, devicePort } from '@/utils/RequestHelper'
import type { Sensor } from '@/domain/core/Sensor'
import { composeSensor } from '@/presentation/ComposeDevice'
import SensorData from "@/components/devices/SensorData.vue";

const userStore = useUserStore()
const $q = useQuasar()
const sensors: Ref<{ sensor: Sensor }[]> = ref([])

if (monitoringSocket == undefined || notificationSocket == undefined) {
  setupSocketServers(userStore.accessToken)
}

const getDevices = async () => {
  useUserStore().permissions.forEach((location: string) => {
    RequestHelper.get(`http://${deviceHost}:${devicePort}/locations/${location}/devices`)
      .then(async (res: any) => {
        if (res.status == HttpStatusCode.OK) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].isEnabled) {
              const sensor = composeSensor(res.data[i])
              sensors.value.push({ sensor: sensor })
            }
          }
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  })
}

getDevices()

if (notificationSocket?.listeners('notification').length === 0) {
  notificationSocket?.on('notification', (anomaly: { type: string }) => {
    switch (anomaly.type) {
      case 'range':
        showNotification('Exceeding notification')
        break
      case 'intrusion':
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
  <div>
    <h2>Monitoring:</h2>
    <div>
      <sensor-data
        v-for="(sensor, index) in sensors.filter(s => s.sensor.isEnabled)"
        :key="index"
        :sensor="sensor.sensor"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
