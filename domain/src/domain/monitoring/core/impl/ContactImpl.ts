import { Contact } from '../Contact.js'
import { ContactType } from './enum/ContactType.js'

export class ContactImpl implements Contact {
  private _value: string
  private _contactType: ContactType

  constructor(value: string, contactType: ContactType) {
    this._value = value
    this._contactType = contactType
  }
  get value(): string {
    return this._value
  }

  set value(v: string) {
    this._value = v
  }

  get contactType(): ContactType {
    return this._contactType
  }

  set contactType(c: ContactType) {
    this._contactType = c
  }
}
