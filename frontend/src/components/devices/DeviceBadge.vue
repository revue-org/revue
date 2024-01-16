<script setup lang="ts">
import type { Device } from "@domain/device/core/Device";
import type { Sensor } from "@domain/device/core/Sensor";
import type { Camera } from "@domain/device/core/Camera";
import { Measure } from "@domain/device/core/impl/enum/Measure";
import { DeviceType } from "@domain/device/core/impl/enum/DeviceType";

defineProps<{
  device: Device;
}>();

const getMeasureColor = (measure: Measure) => {
  switch (measure) {
    case Measure.TEMPERATURE:
      return "red";
    case Measure.PRESSURE:
      return "orange";
    case Measure.HUMIDITY:
      return "teal";
  }
};
</script>

<template>
  <div class="device">
    <header>
      <div>
        <q-spinner-rings v-if="device.isCapturing" color="primary" size="2em" />
        <q-icon v-else name="circle" color="red" size="2em" />
      </div>
      <h3>{{ device.deviceId.code }}</h3>
    </header>
    <ul :class="DeviceType[device.deviceId.type].toLowerCase()">
      <li><i>IP Address: </i>{{ device.ipAddress }}</li>
      <li v-if="device.deviceId.type == DeviceType.SENSOR">
        <i>Acquisition Rate: </i>{{ (device as Sensor).intervalMillis }} ms
      </li>
      <li v-if="device.deviceId.type == DeviceType.CAMERA">
        <i>Resolution: </i
        >{{
          (device as Camera).resolution.width +
          "x" +
          (device as Camera).resolution.height
        }}
      </li>
      <li v-if="device.deviceId.type == DeviceType.SENSOR" class="measures">
        <q-badge
          v-for="measure in (device as Sensor).measures.values()"
          outline
          :style="{ color: getMeasureColor(measure) }"
        >
          {{ Measure[measure] }}
        </q-badge>
      </li>
      <li class="actions">
        <div>
          <q-btn
            :name="device.isCapturing ? 'toggle_on' : 'toggle_off'"
            :icon="device.isCapturing ? 'toggle_on' : 'toggle_off'"
            @click="device.isCapturing = !device.isCapturing"
          />
          <q-tooltip :offset="[0, 8]">Enable</q-tooltip>
        </div>
        <div>
          <q-btn color="secondary" icon="edit" />
          <q-tooltip :offset="[0, 8]">Edit</q-tooltip>
        </div>
        <div>
          <q-btn
            color="negative"
            icon="delete"
            @click="
              device.deviceId.type == DeviceType.SENSOR
                ? $emit('delete-sensor', device)
                : $emit('delete-camera', device)
            "
          />
          <q-tooltip :offset="[0, 8]">Delete</q-tooltip>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/variables";
@import "src/assets/quasar-variables";

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
  &.sensor {
    height: 150px;
  }

  &.camera {
    height: 110px;
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
