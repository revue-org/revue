<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import type { Camera } from '@domain/device/core'
import { DeviceType } from '@domain/device/core'
import type { DeviceFactory, DeviceIdFactory, ResolutionFactory } from '@domain/device/factories'
import {
  DeviceFactoryImpl,
  DeviceIdFactoryImpl,
  ResolutionFactoryImpl
} from '@domain/device/factories'
import { socket, state } from '@/socket'

const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()
const cameras = ref<Camera[]>([
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('cam-01'),
    '192.168.1.20',
    resolutionFactory.createResolution(1920, 1080)
  ),
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('cam-02'),
    '192.168.1.21',
    resolutionFactory.createResolution(1920, 1080)
  ),
  deviceFactory.createCamera(
    deviceIdFactory.createCameraId('cam-03'),
    '192.168.1.22',
    resolutionFactory.createResolution(1920, 1080)
  )
])

let imgSrc: ref<string> = ref('')
console.log(state)

const topics = computed(() => {
  return cameras.value.map(
    (camera) => DeviceType[camera.deviceId.type] + '_' + camera.deviceId.code
  )
})

console.log(topics.value)
socket.emit('subscribe', topics.value)

onBeforeUnmount(() => {
  console.log('unmount', topics.value)
  socket.emit('pause', topics.value)
})

onBeforeMount(() => {
  console.log('mount', topics.value)
  socket.emit('resume', topics.value)
})

socket.on('stream', (newFrame) => {
  imgSrc.value = `data:image/jpeg;base64,${newFrame[0]}`
})
</script>

<template>
  <div class="container">
    <div class="camera" v-for="(camera, index) in cameras" :key="index">
      <h3>
        {{ camera.deviceId.code }}
      </h3>
      <!--          <video autoplay controls>-->
      <!--            <source src="../assets/video.mp4" type="video/mp4" />-->
      <!--          </video>-->
      <img :src="imgSrc" />
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
  img {
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
