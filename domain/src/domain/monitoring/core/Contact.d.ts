import { ContactType } from './ContactType';
export interface Contact {
    getValue(): string;
    setValue(v: string): void;
    getContactType(): ContactType;
    setContactType(c: ContactType): void;
}
