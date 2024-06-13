import { UserId } from '@/domain/core/UserId'
import { User } from '@/domain/core/User'
import { UserRepository } from '@/application/repositories/UserRepository'
import { UserService } from '@/application/services/UserService'

export class UserServiceImpl implements UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.getUsers()
  }

  getPermissions(): Promise<Permission[]> {
    return this.userRepository.getPermissions()
  }

  getUserById(userId: UserId): Promise<User> {
    return this.userRepository.getUserById(userId)
  }

  getPermissionsByUserId(userId: UserId): Promise<Permission[]> {
    return this.userRepository.getPermissionsByUserId(userId)
  }

  insertUser(user: User): void {
    this.userRepository.insertUser(user)
  }

  updateUser(user: User): void {
    this.userRepository.updateUser(user)
  }

  deleteUser(userId: UserId): void {
    this.userRepository.deleteUser(userId)
  }
}
