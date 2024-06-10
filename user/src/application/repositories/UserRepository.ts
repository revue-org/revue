import { User } from "@/domain/core/User"
import { UserId } from "@/domain/core/UserId";

export interface UserRepository {
  getUserById(userId: UserId): Promise<User>

  getUsers(): Promise<User[]>

  saveUser(user: User): Promise<void>

  updateUser(user: User): Promise<void>

  removeUser(userId: UserId): Promise<void>
}