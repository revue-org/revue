import { User } from '../core/User.js'
import { UserId } from '@/domain/core/UserId'
import { Contact } from 'common/dist/domain/core/Contact'

export class UserFactory {
  static newId(): UserId {
    return { value: 'test' }
  }

  static idOf(value: string): UserId {
    return { value }
  }

  static userFrom(id: UserId, name: string, surname: string, mail: string, contacts: Contact[]): User {
    return {
      id,
      name,
      surname,
      mail,
      contacts
    }
  }

  static createUser(name: string, surname: string, mail: string, contacts: Contact[]): User {
    return this.userFrom(this.newId(), name, surname, mail, contacts)
  }
}
