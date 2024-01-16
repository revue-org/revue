import { Contact } from '../Contact.js'
import { ContactType } from './ContactType.js'

export class ContactImpl implements Contact {
  private _id: string
  private _value: string
  private _contactType: ContactType

  constructor(id: string, value: string, contactType: ContactType) {
    this._id = id
    this._value = value
    this._contactType = contactType
  }

  get id(): string {
    return this._value
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
