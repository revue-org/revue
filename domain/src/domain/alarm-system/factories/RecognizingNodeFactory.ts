import { RecognizingNode } from '../core/RecognizingNode'
import { DeviceId } from '../../device/core/DeviceId'

export interface RecognizingNodeFactory {
  createRecognizingNode(
    recognizingNodeId: string,
    ipAddress: string,
    deviceIds: Set<DeviceId>
  ): RecognizingNode
}
