import { UserService } from './UserService.js'
import { UserRepository } from '../repositories/UserRepository.js'
import { UserId } from "@/domain/core/UserId";
import { User } from "@/domain/core/User";

export class UserServiceImpl implements UserService {
  private repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  getUserById(userId: UserId): Promise<User> {
    return this.repository.getUserById(userId)
  }

  getUsers(): Promise<User[]> {
    return this.repository.getUsers()
  }

  deleteUser(userId: UserId): void {
    this.repository.removeUser(userId)
  }

  createUser(user: User): void {
    this.repository.saveUser(user)
  }

  updateUser(user: User): void {
    this.repository.updateUser(user)
  }
}
