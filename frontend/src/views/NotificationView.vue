<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Notification } from '@domain/alarm-system/core'
import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import NotificationBadge from '@/components/notification/NotificationBadge.vue'
import { composeNotification } from '@/scripts/presentation/notification/ComposeNotification'

let notifications: ref<Notification[]> = ref([])

async function getNotifications() {
  await RequestHelper.get(`http://${alarmHost}:${alarmPort}/notifications`)
    .then((res: any) => {
      //notifications.value = []
      for (let i = 0; i < res.data.length; i++) {
        console.log("AAAA")
        console.log(composeNotification(res.data[i]))
        notifications.value.push(composeNotification(res.data[i]))
      }
    })
    .catch(error => {
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
    />
  </div>
</template>

<style scoped lang="scss"></style>
