<script setup lang="ts">
import { Sensor } from "@/views/HomeView.vue";

defineProps<{
  sensor: Sensor;
}>();
</script>

<template>
  <div class="sensor">
    <header>
      <div>
        <q-spinner-rings v-if="sensor.isCapturing" color="primary" size="2em" />
        <q-tooltip :offset="[0, 8]">QSpinnerRings</q-tooltip>
      </div>
      <h3>{{ sensor.deviceId }}</h3>
    </header>
    <ul>
      <li><strong>IP Address:</strong> {{ sensor.ipAddress }}</li>
      <li>
        <strong>Interval Milliseconds:</strong> {{ sensor.intervalMillis }}
      </li>
      <li>
        <div>
          <q-badge
            v-if="sensor.measures.has('TEMPERATURE')"
            outline
            color="red"
            label="TEMPERATURE"
          />
          <q-badge
            v-if="sensor.measures.has('PRESSURE')"
            outline
            color="orange"
            label="PRESSURE"
          />
          <q-badge
            v-if="sensor.measures.has('HUMIDITY')"
            outline
            color="teal"
            label="HUMIDITY"
          />
        </div>
      </li>
    </ul>
  </div>

  <q-btn color="primary" label="Jump Menu">
    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section>Having fun</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Crazy for transitions</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Mind blown</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
}

.sensor {
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin: 10px;
  border-radius: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}

strong {
  margin-right: 5px;
}
</style>
