<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { socket, state } from '@/socket'
import { useTopicsStore } from '@/stores/topics'

const topicsStore = useTopicsStore()
const cameras = ref<{ code: string; src: string }[]>([
  { code: 'cam-01', src: '' },
  { code: 'cam-02', src: '' },
  { code: 'cam-03', src: '' }
])

console.log(state)

const topics = computed(() => cameras.value.map((camera) => 'CAMERA_' + camera.code))

console.log(topics.value)

onBeforeMount(() => {
  for (const topic of topics.value) {
    if (!topicsStore.subscribedTopics.includes(topic)) {
      socket.emit('subscribe', topics)
    } else {
      console.log('Resume to', topics)
    }
    topicsStore.addTopic(topic)
  }
})

onBeforeUnmount(() => {
  for (const topic of topics.value) {
    if (topicsStore.subscribedTopics.includes(topic)) {
      socket.emit('pause', topics)
    }
    topicsStore.removeTopic(topic)
  }
})

socket.on('stream', (newFrame: { topic: string; frame: string }) => {
  cameras.value.find((camera) => camera.code === newFrame.topic.split('CAMERA_')[1])!.src =
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
