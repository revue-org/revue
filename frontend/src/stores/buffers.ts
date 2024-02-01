import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBuffersStore = defineStore(
  'buffers',
  () => {
    const bufferLength = ref<number>(200)
    const temperatureBuffer = ref<number[]>([])
    const humidityBuffer = ref<number[]>([])
    const pressureBuffer = ref<number[]>([])
    const timestampBuffer = ref<string[]>([])

    return {
      bufferLength,
      temperatureBuffer,
      humidityBuffer,
      pressureBuffer,
      timestampBuffer
    }
  },
  {
    persist: false
  }
)
