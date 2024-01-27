<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Measure } from '@domain/device/core'

import type { DeviceIdFactory } from '@domain/device/factories'
import { DeviceIdFactoryImpl } from '@domain/device/factories'
import NotificationBadge from '@/components/notification/NotificationBadge.vue'
import {
  type NotificationFactory,
  NotificationFactoryImpl
} from 'domain/dist/domain/alarm-system/factories'
import { type AnomalyFactory, AnomalyFactoryImpl } from 'domain/dist/domain/anomaly/factories'
import type { Notification } from 'domain/dist/domain/alarm-system/core'
import { ObjectClass } from 'domain/dist/domain/security-rule/core'
import { RequestHelper } from '@/utils/RequestHelper.js'

const notificationFactory: NotificationFactory = new NotificationFactoryImpl()
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

const notifications: ref<Notification[]> = [
  notificationFactory.createExceedingNotification(
    '',
    anomalyFactory.createExceeding(
      '',
      deviceIdFactory.createSensorId('Codice Sensore'),
      new Date(),
      Measure.PRESSURE,
      100
    )
  ),
  notificationFactory.createIntrusionNotification(
    '',
    anomalyFactory.createIntrusion(
      '',
      deviceIdFactory.createCameraId('Codice Camera'),
      new Date(),
      ObjectClass.PERSON
    )
  )
]

let notifications2: ref<Notification[]>

async function getNotifications(): Promise<Notification[]> {
  await RequestHelper.get('/notifications')
    .then((res: any) => {
      const notifications = res.data
      console.log(notifications)
    })
    .catch((error) => {
      console.log(error)
    })
  return notifications
}

onMounted(async () => {
  console.log(await getNotifications())
  notifications2 = ref(await getNotifications())
  console.log('mounted')
  console.log(notifications)
  console.log(notifications2)
})
</script>

<template>
  <h2>Notifications</h2>
  <div>
    <notification-badge
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<style scoped lang="scss"></style>
