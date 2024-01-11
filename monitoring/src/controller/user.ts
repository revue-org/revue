import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema.js'
import { UserRepository } from '@domain/monitoring/repository/UserRepository.js'
import { UserRepositoryImpl } from '@storage/monitoring/UserRepositoryImpl.js'
import { User } from '@domain/monitoring/core/User.js'
import { UserFactory } from '@domain/monitoring/factories/UserFactory.js'
import { UserFactoryImpl } from '@domain/monitoring/factories/impl/UserFactoryImpl.js'

const userModel: Model<User> = model<User>('User', userSchema, 'user')
const userManager: UserRepository = new UserRepositoryImpl(userModel)
const userFactory: UserFactory = new UserFactoryImpl()

export const userController = {
  getUserById: async (req: Request): Promise<User> => {
    return await userManager.getUserById(req.params.id)
  },
  getUsers: async (): Promise<User[]> => {
    return await userManager.getUsers()
  },
  createUser: async (req: Request): Promise<void> => {
    const user: User = userFactory.createUser(
      req.body.id,
      req.body.name,
      req.body.surname,
      req.body.username,
      req.body.password,
      req.body.token,
      req.body.refreshToken,
      req.body.contact,
      req.body.deviceIds
    )
    return await userManager.insertUser(user)
  },
  updateUser: async (req: Request): Promise<void> => {
    const user: User = userFactory.createUser(
      req.body.id,
      req.body.name,
      req.body.surname,
      req.body.username,
      req.body.password,
      req.body.token,
      req.body.refreshToken,
      req.body.contact,
      req.body.deviceIds
    )
    return await userManager.updateUser(user)
  },
  deleteUser: async (req: Request): Promise<void> => {
    return await userManager.deleteUser(req.body.id)
  }
}
