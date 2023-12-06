import { RecognizingNode } from '../RecognizingNode'
import { DeviceId } from '../../../device/core/DeviceId'
import { Anomaly } from '../../../anomaly/core/Anomaly'

export class RecognizingNodeImpl implements RecognizingNode {
  private _recognizingNodeId: number
  private _ipAddress: string
  private _deviceIds: Set<DeviceId>

  constructor(recognizingNodeId: number, ipAddress: string, deviceIds: Set<DeviceId>) {
    this._recognizingNodeId = recognizingNodeId
    this._ipAddress = ipAddress
    this._deviceIds = deviceIds
  }

  get recognizingNodeId(): number {
    return this._recognizingNodeId
  }

  set recognizingNodeId(recognizingNodeId: number) {
    this._recognizingNodeId = recognizingNodeId
  }

  get ipAddress(): string {
    return this._ipAddress
  }

  set ipAddress(ipAddress: string) {
    this._ipAddress = ipAddress
  }

  get deviceIds(): Set<DeviceId> {
    return this._deviceIds
  }

  set deviceIds(deviceIds: Set<DeviceId>) {
    this._deviceIds = deviceIds
  }

  anomalyDetected(): Anomaly {
    throw new Error('Method not implemented.')
  }
}
