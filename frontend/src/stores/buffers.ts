import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBuffersStore = defineStore(
  'buffers',
  () => {
    const bufferLength = ref<number>(200)
    const temperatureBuffer = ref<{ value: number; timestamp: string }[]>([])
    const humidityBuffer = ref<{ value: number; timestamp: string }[]>([])
    const pressureBuffer = ref<{ value: number; timestamp: string }[]>([])
    // const timestampBuffer = ref<string[]>([])

    return {
      bufferLength,
      temperatureBuffer,
      humidityBuffer,
      pressureBuffer
      // timestampBuffer
    }
  },
  {
    persist: false
  }
)
