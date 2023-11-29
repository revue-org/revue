import { Contact } from './Contact'

export interface User {
  getUserId(): number

  getName(): string

  getUsername(): string

  getPassword(): string

  getToken(): string

  getRefreshToken(): string

  addContact(c: Contact): void

  removeContact(c: Contact): void
}
