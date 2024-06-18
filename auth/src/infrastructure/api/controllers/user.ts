import { UserService } from '@/application/services/UserService.js'
import { UserServiceImpl } from '@/application/services/UserServiceImpl.js'
import { MongoDBUserRepository } from '@/infrastructure/storage/MongoDBUserRepository.js'
import { User } from '@/domain/core/User.js'
import { UserId } from '@/domain/core/UserId.js'
import { UserFactory } from "@/domain/factories/UserFactory";

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

  getUserById: async (id: string): Promise<User> => {
    return await service.getUserById(UserFactory.idOf(id))
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

  updateUser: async (id: string, permissions: string[]): Promise<void> => {
    return service.updateUser(UserFactory.idOf(id), permissions)
  },

  deleteUser: async (id: string): Promise<void> => {
    return service.deleteUser(UserFactory.idOf(id))
  }
}
