<script setup lang="ts">
import { popDelete } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import { type Notification } from '@/domain/core/Notification.js'

const { notification } = defineProps<{
  notification: Notification
}>()

const emit = defineEmits<{
  (_e: 'delete-notification'): void
}>()

const $q = useQuasar()

const deleteNotification = () => {
  popDelete($q, 'Are you sure you want to delete this notification?', () => emit('delete-notification'))
}
</script>

<template>
  <li>
    <q-icon v-if="notification.event.type == 'outlier'" size="28px" name="sensor_occupied" />
    <q-icon v-else size="28px" name="timeline" />
    <span>
      {{ notification.event.sourceDeviceId }}
    </span>
    <span> {{ notification.event.timestamp.toLocaleString().split(',')[0] }} </span>
    <span>
      <i> {{ notification.message }} </i>
    </span>

    <span v-if="notification.event.type == 'intrusion'">
      <i style="color: royalblue">{{ notification.event.objectClass }}</i>
    </span>
    <span class="timestamp"
      >Detection hour: {{ notification.event.timestamp.toLocaleString().split(' ')[1] }}</span
    >
    <q-icon size="20px" name="delete" @click="deleteNotification" />
  </li>
</template>

<style scoped lang="scss">
.timestamp {
  font-size: 0.7rem;
  margin-left: auto;
}

li {
  list-style: none;
  width: 100%;
  border: #00acc1 1px solid;
  border-radius: 5px;
  background: #eeeeee;
  padding: 10px;
  margin: 10px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  div.measures {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;

    @media screen and (max-width: 576px) {
      flex-direction: column;
      gap: 5px;
    }
  }

  h3 {
    flex-basis: 200px;
    line-height: 1;

    @media screen and (max-width: 576px) {
      flex-basis: 100px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .timestamp {
      font-size: 0.7rem;
      color: gray;
    }
  }
}
</style>
