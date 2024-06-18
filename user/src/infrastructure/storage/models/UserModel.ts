import { User } from '@/domain/core/User.js'
import { UserFactory } from '@/domain/factories/UserFactory.js'
import { Contact } from '@common/domain/core/Contact.js'
import { ContactFactory } from '@common/domain/factories/ContactFactory.js'
import { ContactType } from 'common/dist/domain/core/ContactType.js'

export interface UserDBEntity {
  id: string
  name: string
  surname: string
  mail: string
  contacts: {
    type: string
    value: string
  }[]
}

export class UserDBAdapter {
  static asDomainEntity(user: UserDBEntity): User {
    const contacts: Contact[] = []
    user.contacts.forEach((contact: { type: string; value: string }) =>
      contacts.push(
        contact.type === ContactType.EMAIL
          ? ContactFactory.createMailContact(contact.value)
          : ContactFactory.createSmsContact(contact.value)
      )
    )
    return UserFactory.createUser(UserFactory.idOf(user.id), user.name, user.surname, user.mail, contacts)
  }

  static asDBEntity(user: User): UserDBEntity {
    const contacts = user.contacts.map((contact: Contact) => {
      return {
        type: contact.type,
        value: contact.value
      }
    })
    return {
      id: user.id.value,
      name: user.name,
      surname: user.surname,
      mail: user.mail,
      contacts
    }
  }
}
