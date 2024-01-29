import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const isLoggedIn = ref(false)
    let username = ref('')
    let accessToken = ref('')
    let refreshToken = ref('')

    function clearFields(): void {
      isLoggedIn.value = false
      username.value = ''
      accessToken.value = ''
      refreshToken.value = ''
    }

    return {
      isLoggedIn,
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
