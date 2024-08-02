<script setup lang="ts">
import { ref } from 'vue'
import { type Capability, CapabilityType, type SensoringCapability } from '@/domain/core/Capability'
import RequestHelper, { deviceHost } from '@/utils/RequestHelper'
import { popNegative, popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import { MeasureType } from 'common/dist/domain/core'
import { colorMap } from '@/utils/MeasureUtils'

const $q = useQuasar()
const emit = defineEmits(['get-devices'])

const resetFields = () => {
  name.value = ''
  description.value = ''
  ip.value = ''
  port.value = 0
  locationId.value = ''
  capabilities.value = []
}

const name = ref<string>()
const description = ref<string>()
const ip = ref<string>()
const port = ref<number>()
const locationId = ref<string>()
const capabilities = ref<Capability[]>([])

const retrieveThingInfos = () => {
  RequestHelper.get(`http://${deviceHost}/devices/${ip.value}:${port.value}/status`)
    .then(async (res: any) => {
      console.log(res.data)
      name.value = res.data.id
      locationId.value = res.data.location
      for (let i = 0; i < res.data.capabilities.length; i++) {
        const capability = res.data.capabilities[i]
        if (capability.type === CapabilityType.SENSOR) {
          capabilities.value.push({
            type: CapabilityType.SENSOR,
            capturingInterval: capability.capturingInterval,
            measure: {
              type: capability.measure.type as MeasureType,
              unit: capability.measure.unit
            }
          })
        } else if (capability.type === CapabilityType.VIDEO) {
          capabilities.value.push({
            type: CapabilityType.VIDEO,
            resolution: capability.resolution
          })
        }
      }
      popPositive($q, 'Thing info retrieved successfully')
    })
    .catch(_error => {
      popNegative($q, 'Error while retrieving device info')
    })
}

const addNewDevice = () => {
  if (!ip.value || !port.value || !locationId.value) {
    popNegative($q, 'Please fill all fields')
    return
  }
  RequestHelper.post(`http://${deviceHost}/devices`, {
    description: description.value,
    endpoint: {
      ipAddress: ip.value,
      port: port.value
    }
  })
    .then(async (_res: any) => {
      popPositive($q, 'Device added successfully')
      emit('get-devices')
    })
    .catch(_error => {
      console.error('Error while adding device')
    })
  resetFields()
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Add device</h3>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>IP Address</label>
        <q-input dense v-model="ip" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Port</label>
        <q-input dense v-model="port" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-btn label="Retrieve info" color="primary" @click="retrieveThingInfos" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Thing name</label>
        <q-input disable dense v-model="name" autofocus />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Location</label>
        <q-input disable dense v-model="locationId" autofocus />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Description</label>
        <q-input dense v-model="description" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        Capabilities:
        <q-badge
          v-for="capability in capabilities"
          :key="capability.type"
          :style="{
            backgroundColor:
              capability.type === 'sensor'
                ? colorMap[(capability as SensoringCapability).measure.type]
                : 'blue'
          }"
        >
          {{ capability.type.toUpperCase() }}
        </q-badge>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="addNewDevice" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
