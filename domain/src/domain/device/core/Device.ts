import { DeviceId } from './DeviceId'

export interface Device {
  get deviceId(): DeviceId

  set deviceId(deviceId: DeviceId)

  get ipAddress(): string

  set ipAddress(ipAddress: string)

  get isCapturing(): boolean

  startCapturing(): void

  stopCapturing(): void
}
