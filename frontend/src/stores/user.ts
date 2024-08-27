import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Contact } from '@common/domain/core/Contact.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const isLoggedIn = ref<boolean>(false)
    const id = ref<string>('')
    const name = ref<string>('')
    const surname = ref<string>('')
    const username = ref<string>('')
    const mail = ref<string>('')
    const contacts = ref<Contact[]>([])
    const password = ref<string>('')
    const role = ref<string>('')
    const permissions = ref<string[]>([])
    const accessToken = ref<string>('')
    const refreshToken = ref<string>('')

    function clearFields() {
      isLoggedIn.value = false
      id.value = ''
      name.value = ''
      surname.value = ''
      username.value = ''
      mail.value = ''
      contacts.value = []
      password.value = ''
      role.value = ''
      permissions.value = []
      accessToken.value = ''
      refreshToken.value = ''
    }

    return {
      isLoggedIn,
      id,
      name,
      surname,
      username,
      mail,
      contacts,
      password,
      role,
      permissions,
      accessToken,
      refreshToken,
      clearFields
    }
  },
  {
    persist: true
  }
)
