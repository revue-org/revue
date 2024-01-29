import { Contact } from '../core/Contact.js'
import { ContactType } from '../core/impl/enum/ContactType.js'

export interface ContactFactory {
  createContact(value: string, type: ContactType): Contact
}
