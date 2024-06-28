<script lang="ts"></script>
<script setup lang="ts">
import { type Ref,onMounted, ref } from 'vue'
import DeviceBadge from '@/components/devices/DeviceBadge.vue'
import { popNegative, popPositive } from '@/scripts/Popups.js'
import RequestHelper, { deviceHost, devicePort } from "@/utils/RequestHelper";
import { useQuasar } from 'quasar'
import { composeDevice } from '@/presentation/ComposeDevice'
import type { Device } from "@/domain/core/Device";
import { useUserStore } from "@/stores/user";
import HttpStatusCode from "common/dist/utils/HttpStatusCode";
import NewDevicePopup from "@/components/devices/NewDevicePopup.vue";

const devices: Ref<Device[]> = ref([])
const $q = useQuasar()

const getDevices = async () => {
  devices.value = []
  useUserStore().permissions.forEach((location: string) => {
    RequestHelper.get(`http://${deviceHost}:${devicePort}/locations/${location}/devices`)
      .then(async (res: any) => {
        if (res.status == HttpStatusCode.OK) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].isEnabled) {
              devices.value.push(composeDevice(res.data[i]))
            }
          }
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  })
}

const deleteDevice = async (device: Device) => {
  await RequestHelper.delete(`http://${deviceHost}:${devicePort}/${device.deviceId}/`)
    .then((res: any) => {
      getDevices()
      popPositive($q, 'Device deleted successfully')
    })
    .catch(() => {
      popNegative($q, 'Error while deleting device')
    })
}

onMounted(async () => {
  await getDevices()
})

const newPopupVisible = ref<boolean>(false)
</script>

<template>
  <div class="new-device">
    <q-btn label="Add a device" color="primary" @click="newPopupVisible = true" />
  </div>

  <h2>Devices:</h2>

  <div class="sensors-container">
    <device-badge
      v-for="device in devices"
      :key="device.deviceId"
      :device="device"
      @delete-device="deleteDevice(device)"
      @get-devices="getDevices"
    />
  </div>

  <new-device-popup
    v-model="newPopupVisible"
    @get-devices="getDevices"
  ></new-device-popup>
</template>

<style scoped lang="scss">
div.new-device {
  text-align: center;
  padding-top: 15px;
}

h2 {
  margin: 0.5rem 1rem;
}

div.sensors-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}

div.cameras-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}
</style>
