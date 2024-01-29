import { Contact } from '../../core/Contact.js'
import { ContactFactory } from '../ContactFactory.js'
import { ContactImpl } from '../../core/impl/ContactImpl.js'
import { ContactType } from '../../core/impl/enum/ContactType.js'

export class ContactFactoryImpl implements ContactFactory {
  createContact(value: string, type: ContactType): Contact {
    return new ContactImpl(value, type)
  }
}
