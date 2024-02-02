import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const isLoggedIn = ref<boolean>(false)
    const userId = ref<string>('')
    const username = ref<string>('')
    const accessToken = ref<string>('')
    const refreshToken = ref<string>('')

    function clearFields(): void {
      isLoggedIn.value = false
      userId.value = ''
      username.value = ''
      accessToken.value = ''
      refreshToken.value = ''
    }

    return {
      isLoggedIn,
      userId,
      username,
      accessToken,
      refreshToken,
      clearFields
    }
  },
  {
    persist: true
  }
)
