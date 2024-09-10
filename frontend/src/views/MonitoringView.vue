<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RequestHelper, { deviceHost, mediaServerHost } from '@/utils/RequestHelper'
import { useUserStore } from '@/stores/user'
import { composeDevice } from '@/presentation/ComposeDevice'
import type { Device } from '@/domain/core/Device'

const videoDevices = ref<Device[]>([])
const getDevices = async () => {
  await RequestHelper.get(`${deviceHost}/devices?capabilities=video`)
    .then((res: any): string[] =>
      res.data
        .filter(
          (device: any) => device.isEnabled && useUserStore().permissions.indexOf(device.locationId) >= 0
        )
        .forEach((device: any) => {
          if (device.isEnabled) {
            videoDevices.value.push(composeDevice(device))
          }
        })
    )
    .catch((_e: any): string[] => {
      throw new Error('Error getting cameras')
    })
}

onMounted(async () => {
  await getDevices()
})
</script>

<template>
  <div class="container">
    <div class="camera" v-for="(camera, index) in videoDevices" :key="index">
      <h3>
        {{ camera.deviceId }}
      </h3>
      <iframe :src="`${mediaServerHost}:8889/${camera.deviceId}/stream/`" allowfullscreen></iframe>
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
  iframe {
    border: none;
    width: 100%;
    height: 300px;
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
