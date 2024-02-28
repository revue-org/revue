<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Notification } from '@domain/alarm-system/core'
import RequestHelper, { alarmHost, alarmPort, monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import NotificationBadge from '@/components/notification/NotificationBadge.vue'
import { composeNotification } from '@/scripts/presentation/notification/ComposeNotification'
import { popNegative, popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'

const notifications: ref<Notification[]> = ref([])
const $q = useQuasar()

async function getNotifications() {
  await RequestHelper.get(`http://${alarmHost}:${alarmPort}/notifications`)
    .then(async (res: any) => {
      notifications.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        notifications.value.push(await composeNotification(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const deleteNotification = async (notification: Notification) => {
  console.log(`http://${alarmHost}:${alarmPort}/notifications/${notification.notificationId}`)
  await RequestHelper.delete(`http://${alarmHost}:${alarmPort}/notifications/${notification.notificationId}`)
    .then((res: any) => {
      getNotifications()
      popPositive($q, 'Notification deleted successfully')
    })
    .catch(error => {
      popNegative($q, 'Error while deleting notification')
      console.log(error)
    })
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
      @delete-notification="deleteNotification(notification)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
