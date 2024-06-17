import { User } from '@/domain/core/User.js'
import { UserId } from '@/domain/core/UserId'

export interface UserService {
  getUsers(): Promise<User[]>

  getPermissions(): Promise<string[]>

  getUserById(userId: UserId): Promise<User>

  getPermissionsByUserId(userId: UserId): Promise<string[]>

  createUser(username: string, password: string, permissions: string[]): Promise<UserId>

  updateUser(id: UserId, password: string, permissions: string[]): void

  deleteUser(userId: UserId): void
}
