import { User } from '@/domain/core/User.js'
import { UserId } from "@/domain/core/UserId";

export interface UserService {
  getUsers(): Promise<User[]>

  getUserById(userId: UserId): Promise<User>

  createUser(user: User): void

  updateUser(user: User): void

  deleteUser(userId: UserId): void
}
