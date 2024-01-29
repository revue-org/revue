import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const isLoggedIn = ref(false)
    let username: string = ''
    let accessToken: string = ''
    let refreshToken: string = ''

    return {
      isLoggedIn,
      username,
      accessToken,
      refreshToken,
    }
  },
  {
    persist: true
  }
)
