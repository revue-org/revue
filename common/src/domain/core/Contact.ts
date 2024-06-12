import { ContactType } from "./ContactType";

export interface Contact {
  get value(): string

  get type(): ContactType
}