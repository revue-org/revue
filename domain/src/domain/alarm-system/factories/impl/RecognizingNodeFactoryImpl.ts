import { RecognizingNode } from '../../core/RecognizingNode.js'
import { RecognizingNodeImpl } from '../../core/impl/RecognizingNodeImpl.js'
import { RecognizingNodeFactory } from '../RecognizingNodeFactory.js'
import { DeviceId } from '../../../device/core/DeviceId.js'

export class RecognizingNodeFactoryImpl implements RecognizingNodeFactory {
  createRecognizingNode(
    recognizingNodeId: string,
    ipAddress: string,
    deviceIds: Set<DeviceId>
  ): RecognizingNode {
    return new RecognizingNodeImpl(recognizingNodeId, ipAddress, deviceIds)
  }
}
