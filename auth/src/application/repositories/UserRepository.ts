import { User } from '@/domain/core/User.js'
import { UserId } from '@/domain/core/UserId'

export interface UserRepository {
  getUsers(): Promise<User[]>

  getPermissions(): Promise<string[]>

  getUserById(userId: UserId): Promise<User>

  getPermissionsByUserId(userId: UserId): Promise<string[]>

  saveUser(user: User): Promise<void>

  updateUser(user: User): Promise<void>

  removeUser(userId: UserId): Promise<void>
}
