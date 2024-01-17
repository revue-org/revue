<script lang="ts"></script>
<script setup lang="ts">
import { ref } from "vue";

import SensorBadge from "@/components/devices/DeviceBadge.vue";
import { DeviceFactoryImpl } from "@domain/device/factories/impl/DeviceFactoryImpl";
import { DeviceIdFactoryImpl } from "@domain/device/factories/impl/DeviceIdFactoryImpl";
import { ResolutionFactoryImpl } from "@domain/device/factories/impl/ResolutionFactoryImpl";
import type { DeviceFactory } from "@domain/device/factories/DeviceFactory";
import type { DeviceIdFactory } from "@domain/device/factories/DeviceIdFactory";
import type { ResolutionFactory } from "@domain/device/factories/ResolutionFactory";
import type { Sensor } from "@domain/device/core/Sensor";
import type { Camera } from "@domain/device/core/Camera";
import { Measure } from "@domain/device/core/impl/enum/Measure";
import { EnvironmentDataFactoryImpl } from "@domain/device/factories/impl/EnvironmentDataFactoryImpl";
import type { EnvironmentData } from "domain/dist/domain/device/core/EnvironmentData";
import { MeasureUnit } from "domain/dist/domain/device/core/impl/enum/MeasureUnit";
import { EnvironmentDataImpl } from "domain/dist/domain/device/core/impl/EnvironmentDataImpl";

const environmentDataFactory = new EnvironmentDataFactoryImpl();

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl();
const deviceFactory: DeviceFactory = new DeviceFactoryImpl();
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl();

const sensors: ref<Sensor[]> = ref([
  deviceFactory.createSensor(
    deviceIdFactory.createSensorId("Sensor 1"),
    "192.168.1.10",
    5,
    [Measure.HUMIDITY, Measure.TEMPERATURE, Measure.PRESSURE],
  ),
  deviceFactory.createSensor(
    deviceIdFactory.createSensorId("Sensor 2"),
    "192.168.1.11",
    5,
    [Measure.TEMPERATURE, Measure.PRESSURE],
  ),
]);

const environmentData: EnvironmentData =
  environmentDataFactory.createEnvironmentData(
    deviceIdFactory.createSensorId("Sensor 1"),
    20,
    Measure.PRESSURE,
    MeasureUnit.PASCAL,
    new Date(),
  );
console.log(EnvironmentDataImpl.toString());

console.log(environmentData);

const cameras: ref<Camera[]> = ref([
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId("Camera 1"),
    "192.168.1.13",
    resolutionFactory.createResolution(1920, 1080),
  ),
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId("Camera 2"),
    "192.168.1.14",
    resolutionFactory.createResolution(1920, 1080),
  ),
]);

const deleteSensor = (sensor: Sensor) => {
  const index = sensors.value.findIndex(
    (s: Sensor) => s.deviceId === sensor.deviceId,
  );
  if (index !== -1) {
    sensors.value.splice(index, 1);
  }
};
const deleteCamera = (camera: Camera) => {
  const index = cameras.value.findIndex(
    (s: Camera) => s.deviceId === camera.deviceId,
  );
  if (index !== -1) {
    cameras.value.splice(index, 1);
  }
};
</script>

<template>
  <h2>Sensors</h2>
  <div class="sensors-container">
    <sensor-badge
      v-for="sensor in sensors"
      :key="sensor.deviceId"
      :device="sensor"
      @delete-sensor="deleteSensor"
    />
  </div>

  <h2>Cameras</h2>
  <div class="cameras-container">
    <sensor-badge
      v-for="camera in cameras"
      :key="camera.deviceId"
      :device="camera"
      @delete-camera="deleteCamera"
    />
  </div>
</template>

<style scoped lang="scss">
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
