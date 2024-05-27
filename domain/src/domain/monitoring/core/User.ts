import { Contact } from './Contact.js'
import { DeviceId } from '../../device/core/DeviceId.js'

export interface User {
  get id(): string

  set id(id: string)

  get name(): string

  set name(name: string)

  get surname(): string

  set surname(surname: string)

  get username(): string

  set username(username: string)

  get password(): string

  set password(password: string)

  get token(): string

  set token(token: string)

  get refreshToken(): string

  set refreshToken(refreshToken: string)

  get contacts(): Contact[]

  set contacts(contacts: Contact[])

  get deviceIds(): DeviceId[]

  set deviceIds(deviceIds: DeviceId[])

  addDevice(deviceId: DeviceId): void
}
