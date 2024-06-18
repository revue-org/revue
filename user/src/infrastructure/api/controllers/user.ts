import { MongoDBUserRepository } from '@/infrastructure/storage/MongoDBUserRepository.js'
import { UserServiceImpl } from '@/application/services/UserServiceImpl.js'
import { User } from '@/domain/core/User.js'
import { Contact } from '@common/domain/core/Contact.js'
import { UserId } from '@/domain/core/UserId.js'
import { UserFactory } from '@/domain/factories/UserFactory.js'
import { UserService } from '@/application/services/UserService.js'

const service: UserService = new UserServiceImpl(new MongoDBUserRepository())
export const controller = {
  getUsers: async (): Promise<User[]> => {
    return await service.getUsers()
  },
  getUserById: async (id: string): Promise<User> => {
    return await service.getUserById(UserFactory.idOf(id))
  },
  createUser: async (name: string, surname: string, mail: string, contacts: Contact[]): Promise<UserId> => {
    return service.createUser(name, surname, mail, contacts)
  },
  updateUser: async (id: string, name: string, surname: string, contacts: Contact[]): Promise<void> => {
    return service.updateUser(UserFactory.idOf(id), name, surname, contacts)
  },
  deleteUser: async (id: string): Promise<void> => {
    return service.deleteUser(UserFactory.idOf(id))
  }
}
