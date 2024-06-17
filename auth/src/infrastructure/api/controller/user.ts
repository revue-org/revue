import { UserService } from '@/application/services/UserService'
import { UserServiceImpl } from '@/application/services/UserServiceImpl'
import { MongoDBUserRepository } from '@/infrastructure/storage/MongoDBUserRepository'
import { User } from '@/domain/core/User'
import { UserId } from '@/domain/core/UserId'

const service: UserService = new UserServiceImpl(new MongoDBUserRepository())

export const controller = {
  login: async (username: string, password: string): Promise<User> => {
    return await service.login(username, password)
  },

  logout: async (accessToken: string, username: string): Promise<void> => {
    return await service.logout(username)
  },

  refreshToken: async (refreshToken: string): Promise<User> => {
    return await service.refreshToken(refreshToken)
  },

  getUsers: async (): Promise<User[]> => {
    return await service.getUsers()
  },

  getPermissions: async (): Promise<string[]> => {
    return await service.getPermissions()
  },

  getUserById: async (userId: UserId): Promise<User> => {
    return await service.getUserById(userId)
  },

  getUserByUsername: async (username: string): Promise<User> => {
    return await service.getUserByUsername(username)
  },

  getPermissionsByUserId: async (userId: UserId): Promise<string[]> => {
    return await service.getPermissionsByUserId(userId)
  },

  createUser: async (username: string, password: string, permissions: string[]): Promise<UserId> => {
    return await service.createUser(username, password, permissions)
  },

  updateUser: async (id: UserId, password: string, permissions: string[]): Promise<void> => {
    return service.updateUser(id, password, permissions)
  },

  deleteUser: async (userId: UserId): Promise<void> => {
    return service.deleteUser(userId)
  }
}
