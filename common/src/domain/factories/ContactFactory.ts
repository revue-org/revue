import { Contact } from '../core/Contact.js'
import { ContactType } from '../core/ContactType.js'

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
