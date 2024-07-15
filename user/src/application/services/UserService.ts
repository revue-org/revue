import { User } from '@/domain/core/User.js'
import { UserId } from '@/domain/core/UserId.js'
import { Contact } from '@common/domain/core/Contact.js'

export interface UserService {
  getUsers(): Promise<User[]>

  getUserById(id: UserId): Promise<User>

  createUser(id: UserId, name: string, surname: string, mail: string, contacts: Contact[]): Promise<UserId>

  updateUser(id: UserId, name: string, surname: string, contacts: Contact[]): Promise<void>

  deleteUser(id: UserId): Promise<void>
}
