import type { Contact } from 'common/dist/domain/core'

export interface User {
  id: string
  name: string
  surname: string
  mail: string
  username: string
  password: string
  accessToken: string
  refreshToken: string
  contacts: Contact[]
  permissions: string[]
}
