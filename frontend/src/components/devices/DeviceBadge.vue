<script setup lang="ts">
import type { Camera, Device, Sensor } from '@domain/device/core'
import { DeviceType, Measure } from '@domain/device/core'
import { getMeasureColor } from '@/utils/MeasureUtils'
import { ref } from 'vue'
import UpdateDevicePopup from '@/components/devices/UpdateDevicePopup.vue'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { DeviceTypeConverter, MeasureConverter } from 'domain/dist/utils'
import { popNegative, popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'

const { device } = defineProps<{
  device: Device
}>()

const emit = defineEmits<{
  (e: 'delete-device'): void
  (e: 'get-sensors'): void
  (e: 'get-cameras'): void
}>()

const updatePopupVisible = ref<boolean>(false)
const $q = useQuasar()

const updateSensor = (sensor: Sensor) => {
  RequestHelper.put(`http://${monitoringHost}:${monitoringPort}/devices/sensors`, {
    code: sensor.deviceId.code,
    ipAddress: sensor.ipAddress,
    intervalMillis: sensor.intervalMillis,
    measures: sensor.measures.map((m: Measure) => {
      return MeasureConverter.convertToString(m)
    })
  })
    .then(async (res: any) => {
      popPositive($q, 'Sensor updated successfully')
      emit('get-sensors')
    })
    .catch(error => {
      popNegative($q, 'Error while updating sensor')
      console.log(error)
    })
}

const updateCamera = (camera: Camera) => {
  RequestHelper.put(`http://${monitoringHost}:${monitoringPort}/devices/cameras`, {
    code: camera.deviceId.code,
    ipAddress: camera.ipAddress,
    resolution: {
      width: parseInt(camera.resolution.width.toString()),
      height: parseInt(camera.resolution.height.toString())
    }
  })
    .then(async (res: any) => {
      popPositive($q, 'Camera updated successfully')
      emit('get-cameras')
    })
    .catch(error => {
      popNegative($q, 'Error while updating camera')
      console.log(error)
    })
}

const enableDevice = async () => {
  const bodyRequest =
    device.deviceId.type == DeviceType.SENSOR
      ? {
          code: device.deviceId.code,
          ipAddress: device.ipAddress,
          isCapturing: !device.isCapturing,
          intervalMillis: (device as Sensor).intervalMillis,
          measures: (device as Sensor).measures.map((m: Measure) => {
            return MeasureConverter.convertToString(m)
          })
        }
      : {
          code: device.deviceId.code,
          ipAddress: device.ipAddress,
          isCapturing: !device.isCapturing,
          resolution: {
            width: parseInt((device as Camera).resolution.width.toString()),
            height: parseInt((device as Camera).resolution.height.toString())
          }
        }
  await RequestHelper.put(
    `http://${monitoringHost}:${monitoringPort}/devices/${DeviceTypeConverter.convertToString(device.deviceId.type).toLowerCase()}s`,
    bodyRequest
  )
    .then(async (res: any) => {
      popPositive($q, device.isCapturing ? 'Device disabled successfully' : 'Device enabled successfully')
      device.isCapturing = !device.isCapturing
    })
    .catch(error => {
      popNegative($q, 'Error while enabling device')
      console.log(error)
    })
}
</script>

<template>
  <div class="device">
    <header>
      <div>
        <q-spinner-rings v-if="device.isCapturing" color="primary" size="2em" />
        <q-icon v-else name="circle" color="red" size="2em" />
      </div>
      <h3>
        {{ device.deviceId.code }}
      </h3>
    </header>
    <ul :class="DeviceType[device.deviceId.type].toLowerCase()">
      <li><i>IP Address: </i>{{ device.ipAddress }}</li>
      <li v-if="device.deviceId.type == DeviceType.SENSOR">
        <i>Acquisition Rate: </i>{{ (device as Sensor).intervalMillis }}
        ms
      </li>
      <li v-if="device.deviceId.type == DeviceType.CAMERA">
        <i>Resolution: </i
        >{{ (device as Camera).resolution.width + 'x' + (device as Camera).resolution.height }}
      </li>
      <li v-if="device.deviceId.type == DeviceType.SENSOR" class="measures">
        <q-badge
          v-for="measure in (device as Sensor).measures.values()"
          outline
          :style="{
            color: getMeasureColor(measure)
          }"
        >
          {{ Measure[measure] }}
        </q-badge>
      </li>
      <li class="actions">
        <div>
          <q-btn
            :name="device.isCapturing ? 'toggle_on' : 'toggle_off'"
            :icon="device.isCapturing ? 'toggle_on' : 'toggle_off'"
            @click="enableDevice"
          />
          <q-tooltip :offset="[0, 8]">Enable</q-tooltip>
        </div>
        <div>
          <q-btn color="secondary" icon="edit" @click="updatePopupVisible = true" />
          <q-tooltip :offset="[0, 8]">Edit</q-tooltip>
        </div>
        <div>
          <q-btn
            color="negative"
            icon="delete"
            @click="
              device.deviceId.type == DeviceType.SENSOR ? $emit('delete-device') : $emit('delete-device')
            "
          />
          <q-tooltip :offset="[0, 8]">Delete</q-tooltip>
        </div>
      </li>
    </ul>
  </div>
  <update-device-popup
    v-model="updatePopupVisible"
    :device="device"
    @update-sensor="updateSensor"
    @update-camera="updateCamera"
  ></update-device-popup>
</template>

<style scoped lang="scss">
@import 'src/assets/variables';
@import 'src/assets/quasar-variables';

header {
  height: auto;
  display: flex;
  align-items: center;

  h3 {
    line-height: unset;
  }

  svg,
  i {
    margin-right: 5px;
  }

  div > i {
    transform: scale(0.7);
  }
}

button {
  padding: 4px 8px;
}

.device {
  width: 15rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 8px;
}

ul {
  @media (min-width: 576px) {
    &.sensor {
      height: 150px;
    }

    &.camera {
      height: 110px;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 7px;
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 0.2rem;

    &:last-child {
      flex-direction: column;
    }

    div {
      margin-right: 5px;
    }

    &.actions {
      display: flex;
      flex-direction: row;
      justify-content: start;
      gap: 5px;
      color: white;

      i {
        font-size: 2rem;
      }

      button[name='toggle_off'] {
        background-color: $disabled;
      }

      button[name='toggle_on'] {
        background-color: $positive;
      }
    }
  }
}
</style>
