<script setup lang="ts">
import type { Notification } from '@domain/alarm-system/core/Notification'
import { getMeasureColor } from '@/utils/MeasureUtils'
import { DeviceType, Measure } from 'domain/dist/domain/device/core'
import type { Exceeding, Intrusion } from "domain/dist/domain/anomaly/core";
import { ObjectClass } from 'domain/dist/domain/security-rule/core'

const { notification } = defineProps<{
  notification: Notification
}>()
</script>

<template>
  <li>
    <h3>
      {{ notification.anomaly.deviceId.code }}
    </h3>
    <span> Notified at: {{ notification.timestamp.toLocaleString().split(' ')[1] }} </span>
    <span v-if="notification.anomaly.deviceId.type == DeviceType.SENSOR">
      <i
        :style="{
          color: getMeasureColor((notification.anomaly as Exceeding).measure)
        }"
        >{{ Measure[(notification.anomaly as Exceeding).measure] }}</i
      >
      :
      {{ (notification.anomaly as Exceeding).value }}</span
    >

    <span v-if="notification.anomaly.deviceId.type == DeviceType.CAMERA">
      <i>{{ ObjectClass[(notification.anomaly as Intrusion).intrusionObject] }}</i>
    </span>
    <span> Detected at: {{ notification.anomaly.timestamp.toLocaleString().split(' ')[1] }} </span>

  </li>
</template>

<style scoped lang="scss">
li {
  list-style: none;
  border-bottom: #00acc1 1px solid;
  padding: 10px;
  margin: 0 10px;
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
    line-height: 1.5;

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
