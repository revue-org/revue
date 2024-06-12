export enum ContactType {
  EMAIL = 'email',
  PHONE = 'phone'
}

export interface Contact {
  get value(): string

  get type(): ContactType
}
