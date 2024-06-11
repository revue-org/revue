import { User } from "@/domain/core/User";
import { UserFactory } from "@/domain/factories/UserFactory";

export interface UserDBEntity {
    id: string
    name: string
    surname: string
    mail: string,
    contacts: {
        type: string
        value: string
    }[]
}

export class UserDBAdapter {

    static asDomainEntity(user: UserDBEntity): User {
        const contacts: Contact[] = [];
        user.contacts.forEach(contact => contacts.push(ContactFactory.create(contact.type, contact.value)));
        return UserFactory.createUser(
          UserFactory.idOf(user.id),
          user.name,
          user.surname,
          user.mail,
          contacts
        )
    }

    static asDBEntity(user: User): UserDBEntity {
        const contacts = user.contacts.map((contact: Contact) => {
            return {
                type: contact.type,
                value: contact.value
            }
        })
        return {
            id: user.id.taxCode,
            name: user.name,
            surname: user.surname,
            mail: user.mail,
            contacts
        }
    }
}