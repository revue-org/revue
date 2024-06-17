import { User } from '../core/User.js'
import { UserId } from "@/domain/core/UserId";
import { Contact } from "common/dist/domain/core/Contact";

export class UserFactory {
  static newId(): UserId {
    return { value: '' }
  }

  static idOf(value: string): UserId {
    return { value }
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
