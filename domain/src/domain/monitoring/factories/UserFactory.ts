import { User } from '../core/User.js'
import { DeviceId } from '../../device/core/DeviceId.js'
import { Contact } from '../core/Contact.js'

export interface UserFactory {
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
  ): User
}
