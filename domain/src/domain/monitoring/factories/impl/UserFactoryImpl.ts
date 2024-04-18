import { UserFactory } from '../UserFactory.js'
import { Contact } from '../../core/Contact.js'
import { User } from '../../core/User.js'
import { UserImpl } from '../../core/impl/UserImpl.js'
import { DeviceId } from '../../../device/core/DeviceId.js'

export class UserFactoryImpl implements UserFactory {
  createUser(
    id: string,
    name: string,
    surname: string,
    username: string,
    password: string,
    token: string,
    refreshToken: string,
    contact: Contact[],
    deviceIds: DeviceId[]
  ): User {
    return new UserImpl(id, name, surname, username, password, token, refreshToken, contact, deviceIds)
  }
}
