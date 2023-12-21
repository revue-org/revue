import { User } from '../core/User'
import { DeviceId } from '../../device/core/DeviceId'
import { Contact } from '../core/Contact'

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
