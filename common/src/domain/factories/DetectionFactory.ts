import { DomainEventId } from '../core/DomainEventId'
import { Detection } from '../core/Detection'

export class DetectionFactory {
  static createDetection(
    id: DomainEventId,
    timestamp: Date,
    sourceDeviceId: string,
    objectClass: string
  ): Detection {
    return {
      id,
      timestamp,
      sourceDeviceId,
      objectClass
    }
  }
}
