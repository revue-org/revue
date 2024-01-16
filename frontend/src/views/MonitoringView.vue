<script setup lang="ts">

import { ref } from 'vue'

const streamings = ref(['video1', 'video2', 'video3'])

</script>

<template>
  <div class="streaming-container">
    <video v-for="streaming in streamings" :key="streaming" autoplay>
      <source src="../assets/video.mp4" type="video/mp4">
    </video>
  </div>
</template>

<style scoped lang="scss">

div.streaming-container {
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;

  video {
    width: 100%;
    height: 100%;
  }

}

@mixin responsive-font-size($breakpoint, $video-per-row) {
  @media (min-width: $breakpoint) {
    div.streaming-container {
      grid-template-columns: repeat($video-per-row, 1fr);
    }
  }
}

@include responsive-font-size(576px, 2);
@include responsive-font-size(992px, 3);
</style>
