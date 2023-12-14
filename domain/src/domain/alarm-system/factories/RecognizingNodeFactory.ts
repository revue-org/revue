import { RecognizingNode } from '../core/RecognizingNode'
import { DeviceId } from '../../device/core/DeviceId'

export interface RecognizingNodeFactory {
  createRecognizingNode(
    recognizingNodeId: number,
    ipAddress: string,
    deviceIds: Set<DeviceId>
  ): RecognizingNode
}
