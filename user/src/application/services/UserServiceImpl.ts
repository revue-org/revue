import { UserService } from './UserService.js'
import { UserRepository } from '../repositories/UserRepository.js'
import { UserId } from '@/domain/core/UserId.js'
import { User } from '@/domain/core/User.js'
import { Contact } from '@common/domain/core/Contact.js'
import { UserFactory } from '@/domain/factories/UserFactory.js'

export class UserServiceImpl implements UserService {
  private repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async getUsers(): Promise<User[]> {
    return this.repository.getUsers()
  }

  async getUserById(userId: UserId): Promise<User> {
    return this.repository.getUserById(userId)
  }

  async createUser(name: string, surname: string, mail: string, contacts: Contact[]): Promise<UserId> {
    const user: User = UserFactory.userFrom(UserFactory.newId(), name, surname, mail, contacts)
    await this.repository.saveUser(user)
    return user.id
  }

  async updateUser(id: UserId, name: string, surname: string, contacts: Contact[]): Promise<void> {
    return this.repository.getUserById(id).then((user: User): void => {
      const update = {
        ...(user as User),
        name: name,
        surname: surname,
        contacts: contacts
      }
      this.repository.updateUser(update)
    })
  }

  async deleteUser(userId: UserId): Promise<void> {
    await this.repository.removeUser(userId)
  }
}
