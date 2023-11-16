import {Contact} from "./Contact";

export interface User {
    getUserId(): number;

    getName(): string;

    addContact(c: Contact): void;

    removeContact(c: Contact): void;
}
