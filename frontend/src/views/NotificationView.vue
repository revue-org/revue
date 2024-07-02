<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RequestHelper, { notificationHost, notificationPort } from '@/utils/RequestHelper'
import NotificationBadge from '@/components/notification/NotificationBadge.vue'
import { useQuasar } from 'quasar'
import { popNegative, popPositive } from '@/scripts/Popups'

const $q = useQuasar()
const notifications: ref<Notification[]> = ref([])

async function getNotifications() {
  await RequestHelper.get(`http://${notificationHost}:${notificationPort}/notifications`)
    .then(async (res: any) => {
      console.log(res)
      notifications.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        //notifications.value.push(await composeNotification(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const deleteNotification = async (notification: Notification) => {
  await RequestHelper.delete(
    `http://${notificationHost}:${notificationPort}/notifications/` //${notification.notificationId}
  )
    .then((_res: any) => {
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
    <h3 v-show="notifications.value === undefined">No notifications</h3>
    <notification-badge
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
      @delete-notification="deleteNotification(notification)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
