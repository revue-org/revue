import { Contact } from '../Contact.js'
import { ContactType } from './enum/ContactType.js'

export class ContactImpl implements Contact {
  private _value: string
  private _type: ContactType

  constructor(value: string, type: ContactType) {
    this._value = value
    this._type = type
  }
  get value(): string {
    return this._value
  }

  set value(v: string) {
    this._value = v
  }

  get type(): ContactType {
    return this._type
  }

  set type(c: ContactType) {
    this._type = c
  }
}
