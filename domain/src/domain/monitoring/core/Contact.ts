import { ContactType } from './impl/enum/ContactType.js'

export interface Contact {
  get value(): string

  set value(v: string)

  get contactType(): ContactType

  set contactType(c: ContactType)
}
