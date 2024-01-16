import { Contact } from '../core/Contact.js'
import { ContactType } from '../core/impl/ContactType.js'

export interface ContactFactory {
  createContact(id: string, value: string, type: ContactType): Contact
}
