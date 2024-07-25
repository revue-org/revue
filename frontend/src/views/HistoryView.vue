<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import RequestHelper, { logHost, logPort } from '@/utils/RequestHelper'
import MeasurementBadge from '@/components/history/MeasurementBadge.vue'
import OutlierBadge from '@/components/history/OutlierBadge.vue'
import IntrusionBadge from '@/components/history/IntrusionBadge.vue'
import { composeMeasurement } from '@/presentation/ComposeMeasurement.js'
import { type Intrusion, type Measurement, type Outlier } from 'common/dist/domain/core'
import { composeIntrusion, composeOutlier } from '@/presentation/ComposeAnomaly.js'

const measurements: Ref<Measurement[]> = ref([])
const intrusions: Ref<Intrusion[]> = ref([])
const outliers: Ref<Outlier[]> = ref([])
const selected = ref('measurements')

function getMeasurements() {
  RequestHelper.get(`http://${logHost}:${logPort}/measurements?limit=50`)
    .then(async (res: any) => {
      measurements.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        measurements.value.push(composeMeasurement(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

function getOutliers() {
  RequestHelper.get(`http://${logHost}:${logPort}/anomalies/outliers?limit=50`)
    .then(async (res: any) => {
      outliers.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        outliers.value.push(composeOutlier(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

function getIntrusions() {
  RequestHelper.get(`http://${logHost}:${logPort}/anomalies/intrusions?limit=50`)
    .then(async (res: any) => {
      intrusions.value = []
      for (let i = res.data.length - 1; i >= 0; i--) {
        intrusions.value.push(composeIntrusion(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

onMounted(() => {
  getMeasurements()
  getOutliers()
  getIntrusions()
})

const optionsHistories = ['measurements', 'intrusions', 'outliers']
</script>

<template>
  <h2>History:</h2>
  <div>
    <q-select
      v-model="selected"
      :options="optionsHistories"
      style="font-size: 20px; width: 400px; margin-left: 10px"
    />
  </div>
  <div v-if="selected === 'measurements'">
    <measurement-badge v-for="(measurement, index) in measurements" :key="index" :measurement="measurement" />
  </div>
  <div v-if="selected === 'outliers'">
    <outlier-badge v-for="(outlier, index) in outliers" :key="index" :outlier="outlier" />
  </div>
  <div v-if="selected === 'intrusions'">
    <intrusion-badge v-for="(intrusion, index) in intrusions" :key="index" :intrusion="intrusion" />
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
