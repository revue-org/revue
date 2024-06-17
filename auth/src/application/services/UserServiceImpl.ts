import { UserId } from '@/domain/core/UserId'
import { User } from '@/domain/core/User'
import { UserRepository } from '@/application/repositories/UserRepository'
import { UserService } from '@/application/services/UserService'
import { UserFactory } from '@/domain/factories/UserFactory'
import bcrypt from 'bcryptjs'
import { jwtManager } from '@/utils/JWTManager'

export class UserServiceImpl implements UserService {
  private repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async login(username: string, password: string): Promise<User> {
    const user: User = await this.repository.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    const match: boolean = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Wrong password')
    const accessToken: string = jwtManager.generateAccessToken(user)
    const refreshToken: string = jwtManager.generateRefreshToken(user)
    await this.repository.updateUser(
      UserFactory.createUser(
        user.id,
        user.username,
        user.password,
        user.permissions,
        accessToken,
        refreshToken
      )
    )
    return user
  }

  async logout(username: string): Promise<void> {
    const user: User = await this.repository.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    return await this.repository.updateUser(
      UserFactory.createUser(user.id, user.username, user.password, user.permissions, '', '')
    )
  }

  async refreshToken(refreshToken: string): Promise<User> {
    if (refreshToken == null || refreshToken === '') throw new Error('Refresh token not valid')
    return await jwtManager.verify(refreshToken, async (err: Error, user: User): Promise<User> => {
      if (err) throw new Error('Error verifying token')
      const update: User = UserFactory.createUser(
        user.id,
        user.username,
        user.password,
        user.permissions,
        jwtManager.generateAccessToken(user),
        refreshToken
      )
      await this.repository.updateUser(update)
      return update
    })
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

  async getUserByUsername(username: string): Promise<User> {
    return this.repository.getUserByUsername(username)
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
