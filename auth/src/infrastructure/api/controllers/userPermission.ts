import { UserService } from '@/application/services/UserService.js'
import { UserServiceImpl } from '@/application/services/UserServiceImpl.js'
import { MongoDBUserRepository } from '@/infrastructure/storage/MongoDBUserRepository.js'
import { UserFactory } from '@/domain/factories/UserFactory.js'
import { User } from '@/domain/core/User'
import { UserId } from '@/domain/core/UserId'

const service: UserService = new UserServiceImpl(new MongoDBUserRepository())

export const permissionController = {
  getPermissions: async (): Promise<string[]> => {
    return await service.getPermissions()
  },

  getPermissionsByUserId: async (id: string): Promise<string[]> => {
    return await service.getPermissionsByUserId(UserFactory.idOf(id))
  },

  addPermissions: async (id: string, permissions: string[]): Promise<void> => {
    const userId: UserId = UserFactory.idOf(id)
    const user: User = await service.getUserById(userId)
    const newPermissions: string[] = [...new Set(user.permissions.concat(permissions))]
    return service.updateUser(userId, newPermissions)
  },

  updatePermissions: async (id: string, permissions: string[]): Promise<void> => {
    return service.updateUser(UserFactory.idOf(id), permissions)
  },

  deletePermissions: async (id: string, permissions: string[]): Promise<void> => {
    const userId: UserId = UserFactory.idOf(id)
    const user: User = await service.getUserById(userId)
    const newPermissions: string[] = user.permissions.filter(permission => !permissions.includes(permission))
    return service.updateUser(userId, newPermissions)
  }
}
