import { Contact } from './Contact.js'
import { DeviceId } from '../../device/core/DeviceId.js'

export interface User {
  get id(): string

  get name(): string

  get surname(): string

  get username(): string

  get password(): string

  get token(): string

  get refreshToken(): string

  get contact(): Contact[]

  get deviceIds(): DeviceId[]

  set id(id: string)

  set name(name: string)

  set surname(surname: string)

  set username(username: string)

  set password(password: string)

  set token(token: string)

  set refreshToken(refreshToken: string)

  set contact(contacts: Contact[])

  set deviceIds(deviceIds: DeviceId[])

  addDevice(deviceId: DeviceId): void
}
