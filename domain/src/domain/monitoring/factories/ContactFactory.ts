import { Contact } from '../core/Contact'
import { ContactType } from "../core/impl/ContactType";

export interface ContactFactory {
  createContact(id: string, value: string, type: ContactType): Contact
}
