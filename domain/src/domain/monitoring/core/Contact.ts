import { ContactType } from './impl/ContactType.js'

export interface Contact {
  get id(): string

  set id(id: string)

  get value(): string

  set value(v: string)

  get contactType(): ContactType

  set contactType(c: ContactType)
}
