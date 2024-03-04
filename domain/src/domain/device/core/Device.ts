import { DeviceId } from './DeviceId.js'

export interface Device {
  get deviceId(): DeviceId

  get ipAddress(): string

  set ipAddress(ipAddress: string)

  get isCapturing(): boolean

  startCapturing(): void

  stopCapturing(): void
}
