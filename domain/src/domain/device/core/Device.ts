import { DeviceId } from './DeviceId.js'

export interface Device {
  get deviceId(): DeviceId

  set deviceId(deviceId: DeviceId)

  get ipAddress(): string

  set ipAddress(ipAddress: string)

  get isCapturing(): boolean

  set isCapturing(isActive: boolean)

  startCapturing(): void

  stopCapturing(): void
}
