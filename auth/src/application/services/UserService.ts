import { User } from '@/domain/core/User.js'
import { UserId } from "@/domain/core/UserId";

export interface UserService {
  getUsers(): Promise<User[]>

  getPermissions(): Promise<Permission[]>

  getUserById(userId: UserId): Promise<User>

  getPermissionsByUserId(userId: UserId): Promise<Permission[]>

  insertUser(user: User): void

  updateUser(user: User): void

  deleteUser(userId: UserId): void
}
