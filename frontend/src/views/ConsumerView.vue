<script setup lang="ts">

import axios from 'axios';

axios.get('http://localhost:5000/api/v1/consumer')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

</script>

<template>
  <div class="streaming-container">
    <video id="my-video" autoplay>
      <source src="../assets/video.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped lang="scss">

</style>
