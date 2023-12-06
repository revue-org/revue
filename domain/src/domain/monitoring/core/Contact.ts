import { ContactType } from './impl/ContactType'

export interface Contact {
  get value(): string

  set value(v: string)

  get contactType(): ContactType

  set contactType(c: ContactType)
}
