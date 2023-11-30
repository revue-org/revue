import { User } from '../User'
import { Contact } from '../Contact'

export class UserImpl implements User {
  addContact(c: Contact): void {}

  getName(): string {
    return ''
  }

  getUsername(): string {
    return ''
  }

  getPassword(): string {
    return ''
  }

  getToken(): string {
    return ''
  }

  getRefreshToken(): string {
    return ''
  }

  getUserId(): number {
    return 0
  }

  removeContact(c: Contact): void {}
}
