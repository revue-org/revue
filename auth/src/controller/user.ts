import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { userSchema } from '@storage/monitoring/schemas/UserSchema.js'
import { UserRepository } from '@domain/monitoring/repository/UserRepository.js'
import { UserRepositoryImpl } from '@storage/monitoring/UserRepositoryImpl.js'
import { User } from '@domain/monitoring/core/User.js'
import { Contact } from '@domain/monitoring/core/Contact.js'
import { UserFactory } from '@domain/monitoring/factories/UserFactory.js'
import { UserFactoryImpl } from '@domain/monitoring/factories/impl/UserFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { DeviceTypeConverter } from '@utils/DeviceTypeConverter.js'
import { ContactFactory } from '@domain/monitoring/factories/ContactFactory.js'
import { ContactFactoryImpl } from '@domain/monitoring/factories/impl/ContactFactoryImpl.js'
import { ContactTypeConverter } from '@utils/ContactTypeConverter.js'

export const userModel: Model<User> = model<User>('User', userSchema, 'user')
const userManager: UserRepository = new UserRepositoryImpl(userModel)
const userFactory: UserFactory = new UserFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const contactFactory: ContactFactory = new ContactFactoryImpl()

export const userController = {
  getUserById: async (id: string): Promise<User> => {
    return await userManager.getUserById(id)
  },
  getUsers: async (): Promise<User[]> => {
    return await userManager.getUsers()
  },
  createUser: async (req: Request): Promise<void> => {
    const contacts: Contact[] = req.body.contacts.map(
      (contactObj: { value: string; type: string }) =>
        contactFactory.createContact(
          contactObj.value,
          ContactTypeConverter.convertToContactType(contactObj.type)
        )
    )
    const deviceIds: DeviceId[] = req.body.deviceIds.map(
      (deviceIdObj: { type: string; code: string }) =>
        deviceIdFactory.createId(
          DeviceTypeConverter.convertToDeviceType(deviceIdObj.type),
          deviceIdObj.code
        )
    )
    const user: User = userFactory.createUser(
      req.body.id,
      req.body.name,
      req.body.surname,
      req.body.username,
      req.body.password,
      req.body.token,
      req.body.refreshToken,
      contacts,
      deviceIds
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
      req.body.contacts,
      req.body.deviceIds
    )
    return await userManager.updateUser(user)
  },
  deleteUser: async (id: string): Promise<void> => {
    return await userManager.deleteUser(id)
  }
}
