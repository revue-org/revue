<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import { monitoringSocket, notificationSocket, setupSocketServers } from '@/socket'
import { useQuasar } from 'quasar'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import HttpStatusCode from '@utils/HttpStatusCode'
import RequestHelper, { deviceHost } from '@/utils/RequestHelper'
import type { Device } from '@/domain/core/Device'
import { composeDevice } from '@/presentation/ComposeDevice'
import SensorData from '@/components/devices/SensorData.vue'

const userStore = useUserStore()
const $q = useQuasar()
const sensingDevices: Ref<Device[]> = ref([])

if (monitoringSocket == undefined || notificationSocket == undefined) {
  setupSocketServers(userStore.accessToken)
}

const getDevices = async () => {
  useUserStore().permissions.forEach((location: string) => {
    RequestHelper.get(`${deviceHost}/devices/locations/${location}`)
      .then(async (res: any) => {
        if (res.status == HttpStatusCode.OK) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].isEnabled) {
              sensingDevices.value.push(composeDevice(res.data[i]))
            }
          }
        }
        if (res.status === HttpStatusCode.UNAUTHORIZED) {
          router.push('/login')
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  })
}

onMounted(async () => {
  await getDevices()
})

if (notificationSocket?.listeners('notifications').length === 0) {
  notificationSocket?.on('notifications', (data: any) => {
    switch (data.notification.event.type) {
      case 'outlier':
        showNotification('Outlier notification')
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
        v-for="(sensor, index) in sensingDevices.filter(s => s.isEnabled)"
        :key="index"
        :sensor="sensor"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
