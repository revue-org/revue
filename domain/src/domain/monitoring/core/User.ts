import { Contact } from './Contact.js'
import { DeviceId } from '../../device/core/DeviceId.js'

export interface User {
  get id(): number

  get name(): string

  get surname(): string

  get username(): string

  get password(): string

  get token(): string

  get refreshToken(): string

  get contact(): Contact

  get deviceIds(): Set<DeviceId>

  addDevice(deviceId: DeviceId): void
}
