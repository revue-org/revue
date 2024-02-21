<script setup lang="ts">
import { ref } from 'vue'
import RequestHelper, { mediaServerHost, monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { type AxiosResponse, HttpStatusCode } from 'axios'

const cameras = ref<{ isCapturing: boolean; code: string; src: string }[]>([])

RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/cameras`).then((res: AxiosResponse) => {
  if (res.status == HttpStatusCode.Ok) {
    for (let i = 0; i < res.data.length; i++) {
      cameras.value.push({ isCapturing: res.data[i].isCapturing, code: res.data[i]._id.code, src: '' })
    }
  }
})

</script>

<template>
  <div class="container">
    <div
      class="camera"
      v-for="(camera, index) in cameras.filter(_camera => _camera.isCapturing)"
      :key="index"
    >
      <h3>
        {{ camera.code }}
      </h3>
      <iframe :src="`http://${mediaServerHost}:8889/${camera.code}/stream/`" allowfullscreen></iframe>
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
