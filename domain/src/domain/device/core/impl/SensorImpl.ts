import { Sensor } from '../Sensor.js'
import { DeviceId } from '../DeviceId.js'
import { Measure } from './enum/Measure.js'

export class SensorImpl implements Sensor {
  private _deviceId: DeviceId
  private _ipAddress: string
  private _isCapturing: boolean
  private _intervalMillis: number
  private _measures: Measure[]

  constructor(deviceId: DeviceId, ipAddress: string, intervalMillis: number, measures: Measure[]) {
    this._deviceId = deviceId
    this._ipAddress = ipAddress
    this._isCapturing = false
    this._intervalMillis = intervalMillis
    this._measures = measures
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

  get intervalMillis(): number {
    return this._intervalMillis
  }

  set intervalMillis(intervalMillis: number) {
    this._intervalMillis = intervalMillis
  }

  get measures(): Measure[] {
    return this._measures
  }

  set measures(measures: Measure[]) {
    this._measures = measures
  }

  addMeasure(measure: Measure) {
    this.measures.push(measure)
  }

  startCapturing(): void {
    this._isCapturing = true
  }

  stopCapturing(): void {
    this._isCapturing = false
  }

  sendEnvironmentData(): void {
    throw new Error('Method not implemented.')
  }
}
