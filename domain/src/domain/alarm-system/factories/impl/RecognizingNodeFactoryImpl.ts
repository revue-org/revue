import { RecognizingNode } from '../../core/RecognizingNode'
import { RecognizingNodeImpl } from '../../core/impl/RecognizingNodeImpl'
import { RecognizingNodeFactory } from '../RecognizingNodeFactory'
import { DeviceId } from '../../../device/core/DeviceId'

export class RecognizingNodeFactoryImpl implements RecognizingNodeFactory {
  createRecognizingNode(
    recognizingNodeId: string,
    ipAddress: string,
    deviceIds: Set<DeviceId>
  ): RecognizingNode {
    return new RecognizingNodeImpl(recognizingNodeId, ipAddress, deviceIds)
  }
}
