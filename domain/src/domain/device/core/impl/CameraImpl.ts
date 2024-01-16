import { Camera } from '../Camera.js'
import { DeviceId } from '../DeviceId.js'
import { Resolution } from '../Resolution.js'

export class CameraImpl implements Camera {
  private _deviceId: DeviceId
  private _ipAddress: string
  private _isCapturing: boolean
  private _resolution: Resolution

  constructor(deviceId: DeviceId, ipAddress: string, resolution: Resolution) {
    this._deviceId = deviceId
    this._ipAddress = ipAddress
    this._isCapturing = false
    this._resolution = resolution
  }

  get deviceId(): DeviceId {
    return this._deviceId
  }

  set deviceId(deviceId: DeviceId) {
    this._deviceId = deviceId
  }

  get ipAddress(): string {
    return this._ipAddress
  }

  set ipAddress(ipAddress: string) {
    this._ipAddress = ipAddress
  }

  get isCapturing(): boolean {
    return this._isCapturing
  }

  set isCapturing(isActive: boolean) {
    this._isCapturing = isActive
  }

  get resolution(): Resolution {
    return this._resolution
  }

  set resolution(resolution: Resolution) {
    this._resolution = resolution
  }

  startCapturing(): void {
    this._isCapturing = true
  }

  stopCapturing(): void {
    this._isCapturing = false
  }
}
