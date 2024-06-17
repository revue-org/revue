import { UserId } from '@/domain/core/UserId'
import { User } from '@/domain/core/User'
import { UserRepository } from '@/application/repositories/UserRepository'
import { UserService } from '@/application/services/UserService'
import { UserFactory } from '@/domain/factories/UserFactory'

export class UserServiceImpl implements UserService {
  private repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async getUsers(): Promise<User[]> {
    return this.repository.getUsers()
  }

  async getPermissions(): Promise<string[]> {
    return this.repository.getPermissions()
  }

  async getUserById(userId: UserId): Promise<User> {
    return this.repository.getUserById(userId)
  }

  async getPermissionsByUserId(userId: UserId): Promise<string[]> {
    return this.repository.getPermissionsByUserId(userId)
  }

  async createUser(username: string, password: string, permissions: string[]): Promise<UserId> {
    const user: User = UserFactory.createUser(UserFactory.newId(), username, password, permissions, '', '')
    await this.repository.saveUser(user)
    return user.id
  }

  async updateUser(id: UserId, password: string, permissions: string[]): Promise<void> {
    return this.repository.getUserById(id).then((user: User): void => {
      const update = {
        ...(user as User),
        password,
        permissions
      }
      this.repository.updateUser(update)
    })
  }

  async deleteUser(userId: UserId): Promise<void> {
    await this.repository.removeUser(userId)
  }
}
