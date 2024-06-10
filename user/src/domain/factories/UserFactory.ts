import { User } from '../core/User.js'
import { Contact } from '../core/Contact.js'
import { UserId } from "@/domain/core/UserId";

export class UserFactory {
  static idOf(taxCode: string): UserId {
    return { taxCode }
  }

  static createUser(
    id: UserId,
    name: string,
    surname: string,
    mail: string,
    contacts: Contact[]
  ): User {
    return {
      id,
      name,
      surname,
      mail,
      contacts
    }
  }

}
