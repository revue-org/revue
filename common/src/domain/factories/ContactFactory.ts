import { Contact } from '../core/Contact'
import { ContactType } from '../core/ContactType'

export class ContactFactory {
  static createSmsContact(value: string): Contact {
    return {
      type: ContactType.SMS,
      value
    }
  }

  static createMailContact(value: string): Contact {
    return {
      type: ContactType.EMAIL,
      value
    }
  }
}
