<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import RequestHelper, { logHost, logPort } from '@/utils/RequestHelper'
import EnvironmentDataBadge from '@/components/history/EnvironmentDataBadge.vue'
import type { EnvironmentData } from 'domain/dist/domain/device/core'
import { composeEnvironmentData } from '@/scripts/presentation/device/ComposeEnvironmentData'

const sensorData: Ref<EnvironmentData[]> = ref([])

function getEnvironmentData() {
  RequestHelper.get(`http://${logHost}:${logPort}/environment-data`)
    .then(async (res: any) => {
      sensorData.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        sensorData.value.push(composeEnvironmentData(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

onMounted(() => {
  getEnvironmentData()
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
  <!--  <div>
    <intrusion-badge
      v-for="(intrusion, index) in cameraIntrusions"
      :key="index"
      :intrusion="intrusion"
    />
  </div>-->
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
