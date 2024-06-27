<script setup lang="ts">
import { onMounted, ref } from "vue";
import RequestHelper, { deviceHost, devicePort} from "@/utils/RequestHelper";
import { popDelete, popNegative, popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import type { Device } from "@/domain/core/Device";
import { colorMap} from "@/utils/MeasureUtils";
import { MeasureType } from "common/dist/domain/core";
import type { Capability, SensoringCapability, VideoStreamingCapability } from "@/domain/core/Capability";

const { device } = defineProps<{
  device: Device
}>()

const emit = defineEmits<{
  (_e: 'delete-device'): void
  (_e: 'get-devices'): void
}>()

const capabilities = ref<Capability[]>([])
const updatePopupVisible = ref<boolean>(false)
const $q = useQuasar()

const updateDevice = (sensor: Device) => {
  RequestHelper.put(`http://${deviceHost}:${devicePort}/`, {
    /*code: sensor.deviceId.code,
    isCapturing: sensor.isCapturing,
    ipAddress: sensor.ipAddress,
    intervalMillis: sensor.intervalMillis,
    measures: sensor.measures.map((m: Measure) => {
      return MeasureConverter.convertToString(m)
    })*/
  })
    .then(async (_res: any) => {
      popPositive($q, 'Device updated successfully')
      emit('get-devices')
    })
    .catch(_error => {
      popNegative($q, 'Error while updating sensor')
    })
}

const getCapabilities = () => {
  RequestHelper.get(`http://${deviceHost}:${devicePort}/${device.deviceId}/capabilities`)
    .then(async (res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        const capability = res.data[i]
        if (capability.type === 'sensor') {
          const sensorCapability: SensoringCapability = {
            type: 'sensor',
            capturingInterval: capability.capturingInterval,
            measure: {
              type: MeasureType[capability.measure.type as keyof typeof MeasureType],
              unit: capability.measure.unit
            }
          }
          capabilities.value.push(sensorCapability)
        } else if (capability.type === 'video') {
          const videoCapability: VideoStreamingCapability = {
            type: 'video',
            resolution: capability.resolution
          }
          capabilities.value.push(videoCapability)
        }
      }
    })
    .catch(_error => {
      popNegative($q, 'Error while getting capabilities')
    })
}

/*const updateCamera = (camera: Camera) => {
  RequestHelper.put(`http://${monitoringHost}:${monitoringPort}/devices/cameras`, {
    code: camera.deviceId.code,
    isCapturing: camera.isCapturing,
    ipAddress: camera.ipAddress,
    resolution: {
      width: parseInt(camera.resolution.width.toString()),
      height: parseInt(camera.resolution.height.toString())
    }
  })
    .then(async (_res: any) => {
      popPositive($q, 'Camera updated successfully')
      emit('get-cameras')
    })
    .catch(_error => {
      popNegative($q, 'Error while updating camera')
    })
}*/

const enableDevice = async () => {
  //TODO TO TEST
 /* RequestHelper.put(`http://${deviceHost}:${devicePort}/${device.deviceId}/enable`, {})
    .then(async (_res: any) => {
      emit('get-devices')
    })
    .catch(_error => {
      popNegative($q, 'Error while enabling device')
    })*/
}

onMounted(() => {
  getCapabilities()
})

const deleteDevice = () => {
  popDelete($q, 'Are you sure you want to delete this device?', () => emit('delete-device'))
}
</script>

<template>
  <div class="device">
    <header>
      <div>
        <q-spinner-rings v-if="device.isEnabled" color="primary" size="2em" />
        <q-icon v-else name="circle" color="red" size="2em" />
      </div>
      <h3>
        {{ device.deviceId }}
      </h3>
    </header>
    <ul>
      <li><i>IP Address: </i>{{ device.endpoint }}</li>
      <li><i>Location: </i>{{ device.locationId }}</li>
      <li><i>Description: </i>{{ device.description }}</li>
      <li>
        <q-badge
          v-for="capability in capabilities"
          :key="capability.type"
          :style="{
            backgroundColor: capability.type === 'sensor' ? colorMap[(capability as SensoringCapability).measure.type] : 'blue'
          }">
          {{ capability.type.toUpperCase() }}
        </q-badge>
      </li>
      <li class="actions">
        <div>
          <q-btn
            :name="device.isEnabled ? 'toggle_on' : 'toggle_off'"
            :icon="device.isEnabled ? 'toggle_on' : 'toggle_off'"
            @click="enableDevice"
          />
          <q-tooltip :offset="[0, 8]">Enable</q-tooltip>
        </div>
        <div>
          <q-btn color="secondary" icon="edit" @click="updatePopupVisible = true" />
          <q-tooltip :offset="[0, 8]">Edit</q-tooltip>
        </div>
        <div>
          <q-btn color="negative" icon="delete" @click="deleteDevice" />
          <q-tooltip :offset="[0, 8]">Delete</q-tooltip>
        </div>
      </li>
    </ul>
  </div>
<!--  <update-device-popup
    v-model="updatePopupVisible"
    :device="device"
    @update-device="updateDevice"
  ></update-device-popup>-->
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
    &.device {
      height: 150px;
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

