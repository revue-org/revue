<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { DeviceIdFactory } from '@domain/device/factories'
import { DeviceIdFactoryImpl } from '@domain/device/factories'
import NotificationBadge from '@/components/notification/NotificationBadge.vue'
import {
  type NotificationFactory,
  NotificationFactoryImpl
} from 'domain/dist/domain/alarm-system/factories'
import { type AnomalyFactory, AnomalyFactoryImpl } from 'domain/dist/domain/anomaly/factories'
import type { Notification } from 'domain/dist/domain/alarm-system/core'
import { RequestHelper } from '@/utils/RequestHelper.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { DeviceTypeConverter } from '@utils/DeviceTypeConverter.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import type { Exceeding, Intrusion } from 'domain/dist/domain/anomaly/core'
import { DeviceType } from "domain/dist/domain/device/core";

const notificationFactory: NotificationFactory = new NotificationFactoryImpl()
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

let notifications: ref<Notification[]> = ref<Notification[]>([])

async function getNotifications() {
  await RequestHelper.get('http://localhost:4000/notifications')
    .then((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        composeNotification(res.data[i])
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

async function composeNotification(notification: any) {
  await RequestHelper.get('http://localhost:4000/anomalies/' + notification.anomalyId)
    .then((anomaly: any) => {
      switch (DeviceTypeConverter.convertToDeviceType(anomaly.data.deviceId.type)) {
        case DeviceType.CAMERA:
          notifications.value.push(
            notificationFactory.createIntrusionNotification(
              notification._id,
              composeIntrusion(anomaly.data)
            )
          )
          break
        case DeviceType.SENSOR:
          notifications.value.push(
            notificationFactory.createExceedingNotification(
              notification._id,
              composeExceeding(anomaly.data)
            )
          )
          break
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function composeIntrusion(intrusion: any): Intrusion {
  return anomalyFactory.createIntrusion(
    intrusion._id,
    deviceIdFactory.createCameraId(intrusion.deviceId.code),
    new Date(intrusion.timestamp),
    ObjectClassConverter.convertToObjectClass(intrusion.intrusionObject)
  )
}

function composeExceeding(exceeding: any): Exceeding {
  return anomalyFactory.createExceeding(
    exceeding._id,
    deviceIdFactory.createSensorId(exceeding.deviceId.code),
    new Date(exceeding.timestamp),
    MeasureConverter.convertToMeasure(exceeding.measure),
    exceeding.value
  )
}

onMounted(async () => {
  await getNotifications()
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
