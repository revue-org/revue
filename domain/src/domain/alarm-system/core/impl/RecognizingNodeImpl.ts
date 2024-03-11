import { RecognizingNode } from '../RecognizingNode.js'
import { DeviceId } from '../../../device/core/DeviceId.js'
import { Anomaly } from '../../../alarm-system/core/Anomaly.js'

export class RecognizingNodeImpl implements RecognizingNode {
  private _recognizingNodeId: string
  private _ipAddress: string
  private _deviceIds: DeviceId[]

  constructor(recognizingNodeId: string, ipAddress: string, deviceIds: DeviceId[]) {
    this._recognizingNodeId = recognizingNodeId
    this._ipAddress = ipAddress
    this._deviceIds = deviceIds
  }

  get recognizingNodeId(): string {
    return this._recognizingNodeId
  }

  set recognizingNodeId(recognizingNodeId: string) {
    this._recognizingNodeId = recognizingNodeId
  }

  get ipAddress(): string {
    return this._ipAddress
  }

  set ipAddress(ipAddress: string) {
    this._ipAddress = ipAddress
  }

  get deviceIds(): DeviceId[] {
    return this._deviceIds
  }

  set deviceIds(deviceIds: DeviceId[]) {
    this._deviceIds = deviceIds
  }

  anomalyDetected(): Anomaly {
    throw new Error('Method not implemented.')
  }
}
