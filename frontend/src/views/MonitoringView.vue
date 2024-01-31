<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { monitoringSocket } from '@/socket'
import { useTopicsStore } from '@/stores/topics'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { type AxiosResponse, HttpStatusCode } from 'axios'
import { DeviceTypeConverter } from 'domain/dist/utils'
import { DeviceType } from 'domain/dist/domain/device/core'

const topicsStore = useTopicsStore()
const cameras = ref<{ code: string; src: string }[]>([])

RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/cameras`).then((res: AxiosResponse) => {
  if (res.status == HttpStatusCode.Ok) {
    for (let i = 0; i < res.data.length; i++) {
      cameras.value.push({ code: res.data[i]._id.code, src: '' })
    }
  }
})

onBeforeMount(() => {
  console.log(
    'resume' +
      topicsStore.subscribedTopics.filter((topic: string) =>
        topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.CAMERA))
      )
  )
  monitoringSocket.emit(
    'resume',
    topicsStore.subscribedTopics.filter((topic: string) =>
      topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.CAMERA))
    )
  )
})

onBeforeUnmount(() => {
  console.log(
    'pause' +
      topicsStore.subscribedTopics.filter((topic: string) =>
        topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.CAMERA))
      )
  )
  monitoringSocket.emit(
    'pause',
    topicsStore.subscribedTopics.filter((topic: string) =>
      topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.CAMERA))
    )
  )
})

monitoringSocket.on('stream', (newFrame: { topic: string; frame: string }) => {
  cameras.value.find(camera => camera.code === newFrame.topic.split('_')[1])!.src =
    `data:image/jpeg;base64,${newFrame.frame}`
})
</script>

<template>
  <div class="container">
    <div class="camera" v-for="(camera, index) in cameras" :key="index">
      <h3>
        {{ camera.code }}
      </h3>
      <img :src="camera.src" alt="" />
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
