<script setup lang="ts">
import { Sensor } from '@/views/HomeView.vue'

defineProps<{
  sensor: Sensor;
}>()

// define emit to delete the sensor
// const emit = defineEmits<{
//   deleteSensor: [sensor: Sensor] // named tuple syntax
// }>()
//

</script>

<template>
  <div class="sensor">
    <header>
      <div>
        <q-spinner-rings v-if="sensor.isCapturing" color="primary" size="2em" />
        <q-icon v-else name="circle" color="red" size="2em" />
      </div>
      <h3>{{ sensor.deviceId }}</h3>
    </header>
    <ul>
      <li><i>IP Address:</i> {{ sensor.ipAddress }}</li>
      <li><i>Acquisition Rate:</i> {{ sensor.intervalMillis }} ms</li>
      <li class="measures">
        <q-badge v-for="measure in sensor.measures"
                 outline
                 :style="{ color: measure == 'TEMPERATURE' ? 'red' : (measure == 'PRESSURE' ? 'orange' : 'teal') }">
          {{ measure }}
        </q-badge>
      </li>
      <li class="actions">
        <div>
          <q-btn :name="sensor.isCapturing ? 'toggle_on' : 'toggle_off'"
                 :icon="sensor.isCapturing ? 'toggle_on' : 'toggle_off'"
                 @click="sensor.isCapturing = !sensor.isCapturing" />
          <q-tooltip :offset="[0, 8]">Enable</q-tooltip>
        </div>
        <div>
          <q-btn color="secondary" icon="edit" />
          <q-tooltip :offset="[0, 8]">Edit</q-tooltip>
        </div>
        <div>
          <q-btn color="negative" icon="delete" @click="$emit('delete-sensor', sensor);" />
          <q-tooltip :offset="[0, 8]">Delete</q-tooltip>
        </div>
      </li>
    </ul>
  </div>

</template>

<style scoped lang="scss">
@import "src/assets/variables.scss";
@import "src/assets/quasar-variables.sass";

header {
  display: flex;
  align-items: center;

  svg, i {
    margin-right: 5px;
  }

  div > i {
    transform: scale(0.7);
  }
}

button {
  padding: 4px 8px;
}

.sensor {
  width: 15rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin: 10px;
  border-radius: 8px;
}

ul {
  margin-left: 7px;
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 0.15rem;

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

      button[name="toggle_off"] {
        background-color: $disabled;
      }

      button[name="toggle_on"] {
        background-color: $positive;
      }
    }

  }

}

</style>
