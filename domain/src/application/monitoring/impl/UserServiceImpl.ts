import { UserService } from '../UserService.js'
import { User } from '../../../domain/monitoring/core/User.js'
import { UserRepository } from '../../../domain/monitoring/repositories/UserRepository.js'

export class UserServiceImpl implements UserService {
  private userRepository: UserRepository
  private users: User[] = []

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  getUserById(userId: string): Promise<User> {
    return this.userRepository.getUserById(userId)
  }

  getUserByUsername(username: string): Promise<User> {
    return this.userRepository.getUserByUsername(username)
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.getUsers()
  }

  deleteUser(userId: string): void {
    this.userRepository.deleteUser(userId).then((): void => {
      this.users = this.users.filter((user: User): boolean => user.id !== userId)
    })
  }

  insertUser(user: User): void {
    this.userRepository.insertUser(user).then(() => this.users.push(user))
  }

  updateUser(user: User): void {
    this.userRepository.updateUser(user).then((): void => {
      this.users = this.users.map((u: User): User => (u.id === user.id ? user : u))
    })
  }
}
