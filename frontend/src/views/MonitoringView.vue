<script setup lang="ts">
import { ref } from 'vue'
import type { Camera } from '@domain/device/core/Camera'
import { DeviceFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceFactoryImpl'
import type { DeviceFactory } from 'domain/dist/domain/device/factories/DeviceFactory'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl'
import type { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory'
import { ResolutionFactoryImpl } from 'domain/dist/domain/device/factories/impl/ResolutionFactoryImpl'
import type { ResolutionFactory } from 'domain/dist/domain/device/factories/ResolutionFactory'

const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()
const cameras = ref<Camera[]>([
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('Camera 1'),
    '192.168.1.20',
    resolutionFactory.createResolution(1920, 1080)
  ),
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('Camera 2'),
    '192.168.1.21',
    resolutionFactory.createResolution(1920, 1080)
  ),
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('Camera 3'),
    '192.168.1.22',
    resolutionFactory.createResolution(1920, 1080)
  )
])
</script>

<template>
  <div class="container">
    <div class="camera" v-for="(camera, index) in cameras" :key="index">
      <h3>
        {{ camera.deviceId.code }}
      </h3>
      <video autoplay controls>
        <source src="../assets/video.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.container {
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;

  h3 {
    line-height: 1.5;
  }

  .camera,
  video {
    width: 100%;
  }
}

@mixin responsive-font-size($breakpoint, $video-per-row) {
  @media (min-width: $breakpoint) {
    div.container {
      grid-template-columns: repeat($video-per-row, 1fr);
    }
  }
}

@include responsive-font-size(576px, 2);
@include responsive-font-size(992px, 3);
</style>
