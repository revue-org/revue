import { User } from '../../domain/monitoring/core/User.js'

export interface UserService {
  getUsers(): Promise<User[]>

  getUserById(userId: string): Promise<User>

  getUserByUsername(username: string): Promise<User>

  insertUser(user: User): void

  updateUser(user: User): void

  deleteUser(userId: string): void
}
