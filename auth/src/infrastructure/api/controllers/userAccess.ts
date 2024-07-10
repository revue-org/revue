import { UserService } from '@/application/services/UserService.js'
import { UserServiceImpl } from '@/application/services/UserServiceImpl.js'
import { MongoDBUserRepository } from '@/infrastructure/storage/MongoDBUserRepository.js'
import { User } from '@/domain/core/User.js'

const service: UserService = new UserServiceImpl(new MongoDBUserRepository())

export const accessController = {
  login: async (username: string, password: string): Promise<User> => {
    return await service.login(username, password)
  },

  logout: async (accessToken: string, username: string): Promise<void> => {
    return await service.logout(username)
  },

  refreshToken: async (refreshToken: string): Promise<User> => {
    return await service.refreshToken(refreshToken)
  }
}
