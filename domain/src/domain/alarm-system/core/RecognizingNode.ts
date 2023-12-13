import { Anomaly } from '../../anomaly/core/Anomaly.js'
import { DeviceId } from '../../device/core/DeviceId.js'

export interface RecognizingNode {
  get recognizingNodeId(): number

  set recognizingNodeId(recognizingNodeId: number)

  get ipAddress(): string

  set ipAddress(ipAddress: string)

  get deviceIds(): Set<DeviceId>

  set deviceIds(deviceIds: Set<DeviceId>)

  anomalyDetected(): Anomaly
}
