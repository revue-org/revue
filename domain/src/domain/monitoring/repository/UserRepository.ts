import { User } from '../core/User.js'

export interface UserRepository {
  getUsers(): Promise<Array<User>>

  getUserById(userId: string): Promise<User>

  getUserByUsername(username: string): Promise<User>

  insertUser(user: User): Promise<void>

  updateUser(user: User): Promise<void>

  deleteUser(userId: string): Promise<void>
}
