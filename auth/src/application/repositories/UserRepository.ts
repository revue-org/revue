import { User } from '@/domain/core/User.js'
import { UserId } from '@/domain/core/UserId'

export interface UserRepository {
  getUsers(): Promise<User[]>

  getPermissions(): Promise<string[]>

  getUserById(userId: UserId): Promise<User>

  getPermissionsByUserId(userId: UserId): Promise<string[]>

  insertUser(user: User): Promise<void>

  updateUser(user: User): Promise<void>

  deleteUser(userId: UserId): Promise<void>
}
