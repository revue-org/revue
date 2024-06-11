import { User } from '@domain/monitoring/core/User.js'
import { Contact } from '@domain/monitoring/core/Contact.js'
import { UserFactory } from '@domain/monitoring/factories/UserFactory.js'
import { userService } from '../init.js'
import { UserId } from "@/domain/core/UserId";

export const userController = {
  getUserById: async (id: string): Promise<User> => {
    return await userService.getUserById(id)
  },
  getUsers: async (): Promise<User[]> => {
    return await userService.getUsers()
  },
  createUser: async (name: string, surname: string, mail: string, contacts: Contact[]): Promise<void> => {
    //TODO: Add id generation
    const id: UserId = UserFactory.idOf(mail)
    const user: User = UserFactory.createUser(
      id,
      name,
      surname,
      mail,
      contacts
    )
    return userService.insertUser(user)
  },
  updateUser: async (id: UserId, name: string, surname: string, mail: string, contacts: Contact[]): Promise<void> => {
    return userService.updateUser(UserFactory.createUser(
      id,
      name,
      surname,
      mail,
      contacts
    ))
  },
  deleteUser: async (id: UserId): Promise<void> => {
    return userService.deleteUser(id)
  }
}
