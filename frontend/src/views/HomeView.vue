<script lang="ts">
export class Sensor {
  private _deviceId: string;
  private _ipAddress: string;
  private _isCapturing: boolean;
  private _intervalMillis: number;
  private _measures: Set<string>;

  constructor(
    deviceId: string,
    ipAddress: string,
    intervalMillis: number,
    measures: Set<string>,
  ) {
    this._deviceId = deviceId;
    this._ipAddress = ipAddress;
    this._isCapturing = true;
    this._intervalMillis = intervalMillis;
    this._measures = measures;
  }

  get deviceId(): string {
    return this._deviceId;
  }

  get ipAddress(): string {
    return this._ipAddress;
  }

  get isCapturing(): boolean {
    return this._isCapturing;
  }

  get intervalMillis(): number {
    return this._intervalMillis;
  }

  get measures(): Set<string> {
    return this._measures;
  }
}
</script>
<script setup lang="ts">
import NavbarComponent from "../components/NavbarComponent.vue";
import SensorBadge from "@/components/SensorBadge.vue";

const sensor: Sensor = new Sensor(
  "Device Id 1",
  "192.168.1.10",
  5,
  new Set(["HUMIDITY", "TEMPERATURE"]),
);
</script>

<template>
  <NavbarComponent />

  <main>
    <q-btn color="secondary" label="Secondary" />

    <SensorBadge :sensor="sensor" />
  </main>
</template>
