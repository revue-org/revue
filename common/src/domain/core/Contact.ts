import { ContactType } from "./ContactType";

export interface Contact {
  readonly value: string

  readonly type: ContactType
}