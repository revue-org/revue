import { RecognizingNode } from '../core/RecognizingNode.js'
import { DeviceId } from '../../device/core/DeviceId.js'

export interface RecognizingNodeFactory {
  createRecognizingNode(
    recognizingNodeId: string,
    ipAddress: string,
    deviceIds: Set<DeviceId>
  ): RecognizingNode
}
