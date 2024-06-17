import { MongoDBUserRepository } from '@/infrastructure/storage/MongoDBUserRepository'
import { UserServiceImpl } from '@/application/services/UserServiceImpl'
import { User } from '@/domain/core/User'
import { Contact } from 'common/dist/domain/core/Contact'
import { UserId } from '@/domain/core/UserId'
import { UserFactory } from '@/domain/factories/UserFactory'
import { UserService } from '@/application/services/UserService'

const service: UserService = new UserServiceImpl(new MongoDBUserRepository())
export const userController = {
  getUsers: async (): Promise<User[]> => {
    return await service.getUsers()
  },
  getUserById: async (id: string): Promise<User> => {
    return await service.getUserById(UserFactory.idOf(id))
  },
  createUser: async (name: string, surname: string, mail: string, contacts: Contact[]): Promise<UserId> => {
    return service.createUser(name, surname, mail, contacts)
  },
  updateUser: async (id: UserId, name: string, surname: string, contacts: Contact[]): Promise<void> => {
    return service.updateUser(id, name, surname, contacts)
  },
  deleteUser: async (id: UserId): Promise<void> => {
    return service.deleteUser(id)
  }
}
