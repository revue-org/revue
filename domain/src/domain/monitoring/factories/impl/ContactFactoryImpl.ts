import { Contact } from '../../core/Contact'
import { ContactFactory } from '../ContactFactory'
import { ContactImpl } from '../../core/impl/ContactImpl'
import { ContactType } from "../../core/impl/ContactType";

export class ContactFactoryImpl implements ContactFactory {
  createContact(id: string, value: string, type: ContactType): Contact {
    return new ContactImpl(id, value, type)
  }
}
