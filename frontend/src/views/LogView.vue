<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RequestHelper, { logHost, logPort } from '@/utils/RequestHelper'
import EnvironmentDataBadge from '@/components/history/EnvironmentDataBadge.vue'
import IntrusionBadge from '@/components/history/IntrusionBadge.vue'
import { useQuasar } from 'quasar'
import type { EnvironmentData } from "domain/dist/domain/device/core";
import type { Intrusion } from "domain/dist/domain/anomaly/core";

const sensorData: ref<EnvironmentData[]> = ref([])
const cameraIntrusions: ref<Intrusion[]> = ref([])

async function getDetections() {
  await RequestHelper.get(`http://${logHost}:${logPort}/environment-data`)
    .then(async (res: any) => {
      sensorData.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        sensorData.value.push(await composeEnvironmentData(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}
async function getRecognitions() {
  await RequestHelper.get(`http://${logHost}:${logPort}/intrusions`)
    .then(async (res: any) => {
      cameraIntrusions.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        cameraIntrusions.value.push(await composeIntrusion(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}


onMounted(async () => {
  await getDetections()
  await getRecognitions()
})
</script>

<template>
  <h2>History:</h2>
  <div>
    <environment-data-badge
      v-for="(environmentData, index) in sensorData"
      :key="index"
      :environmentData="environmentData"
    />
  </div>
  <div>
    <intrusion-badge
      v-for="(intrusion, index) in cameraIntrusions"
      :key="index"
      :intrusion="intrusion"
    />
  </div>
</template>

<style scoped lang="scss">
.div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
