import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTopicsStore = defineStore(
  'topics',
  () => {
    const subscribedTopics = ref<string[]>([])

    function addTopic(topic: string): void {
      subscribedTopics.value.push(topic)
    }

    function removeTopic(topic: string): void {
      subscribedTopics.value.splice(subscribedTopics.value.indexOf(topic), 1)
    }

    return {
      subscribedTopics,
      addTopic,
      removeTopic
    }
  },
  {
    persist: false
  }
)
