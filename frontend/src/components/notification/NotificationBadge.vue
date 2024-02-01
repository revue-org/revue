<script setup lang="ts">
import type { Notification } from 'domain/dist/domain/alarm-system/core/Notification'
import { getMeasureColor } from '@/utils/MeasureUtils'
import { DeviceType, Measure } from 'domain/dist/domain/device/core'
import type { Exceeding, Intrusion } from 'domain/dist/domain/anomaly/core'
import { ObjectClass } from 'domain/dist/domain/security-rule/core'

const { notification } = defineProps<{
  notification: Notification
}>()
</script>

<template>
  <li>
    <q-icon
      v-if="notification.anomaly.deviceId.type == DeviceType.CAMERA"
      size="28px"
      name="sensor_occupied"
    />
    <q-icon v-else size="28px" name="timeline" />
    <span>
      {{ notification.anomaly.deviceId.code }}
    </span>
    <span> {{ notification.timestamp.toLocaleString().split(' ')[0] }} </span>
    <span v-if="notification.anomaly.deviceId.type == DeviceType.SENSOR">
      <i>For the </i>
      <i
        :style="{
          color: getMeasureColor((notification.anomaly as Exceeding).measure)
        }"
        >{{ Measure[(notification.anomaly as Exceeding).measure] }}</i
      >
      <i>
        measurement a value out of range was detected. Value:
        {{ (notification.anomaly as Exceeding).value }}
      </i>
    </span>

    <span v-if="notification.anomaly.deviceId.type == DeviceType.CAMERA">
      <i
        >A {{ ObjectClass[(notification.anomaly as Intrusion).intrusionObject] }} class intrusion was
        detected.</i
      >
    </span>
    <span class="timestamp"
      >Detection hour: {{ notification.anomaly.timestamp.toLocaleString().split(' ')[1] }}</span
    >
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
