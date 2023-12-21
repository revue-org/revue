import { Contact } from '../../core/Contact.js'
import { ContactFactory } from '../ContactFactory.js'
import { ContactImpl } from '../../core/impl/ContactImpl.js'
import { ContactType } from '../../core/impl/ContactType.js'

export class ContactFactoryImpl implements ContactFactory {
  createContact(id: string, value: string, type: ContactType): Contact {
    return new ContactImpl(id, value, type)
  }
}
