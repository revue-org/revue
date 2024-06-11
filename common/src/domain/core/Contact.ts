export enum ContactType {
  EMAIL = 'email',
  PHONE = 'phone'
}

export interface Contact {
  get value(): string

  set value(v: string)

  get type(): ContactType

  set type(c: ContactType)
}
