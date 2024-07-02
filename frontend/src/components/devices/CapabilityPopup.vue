<script setup lang="ts">
import {
  type Capability,
  CapabilityType,
  type SensoringCapability,
  type VideoStreamingCapability
} from '@/domain/core/Capability'

defineProps<{
  capability: Capability
}>()
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Capability</h3>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Type</label>
        <q-input disable dense v-model="capability.type" />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="capability.type === CapabilityType.SENSOR">
        <label>Measure</label>
        <q-input disable dense v-model="(capability as SensoringCapability).measure.type" />
        <q-input disable dense v-model="(capability as SensoringCapability).measure.unit" />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="capability.type === CapabilityType.SENSOR">
        <label>Capturing Interval</label>
        <q-input disable dense v-model="(capability as SensoringCapability).capturingInterval" />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="capability.type === CapabilityType.VIDEO">
        <label>Resolution</label>
        <q-input disable dense v-model="(capability as VideoStreamingCapability).resolution" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
div.resolution {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 15px;

  input {
    height: 50px !important;
  }
}
</style>
