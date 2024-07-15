import type { Contact } from 'common/dist/domain/core'

export interface User {
  id: string
  name: string
  surname: string
  mail: string
  username: string
  role: string
  contacts: Contact[]
  permissions: string[]
}
