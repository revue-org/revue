import { ContactType } from './impl/enum/ContactType.js'

export interface Contact {
  get value(): string

  set value(v: string)

  get type(): ContactType

  set type(c: ContactType)
}
