import { DomainEventId } from '../core/DomainEventId'
import { Detection } from '../core/Detection'
import { ObjectClass } from '../core/ObjectClass'

export class DetectionFactory {
  static newId(): DomainEventId {
    return {
      value: 'test'
    }
  }

  static idOf(value: string): DomainEventId {
    return { value }
  }

  static createDetection(
    id: DomainEventId,
    timestamp: Date,
    sourceDeviceId: string,
    objectClass: ObjectClass
  ): Detection {
    return {
      id,
      timestamp,
      sourceDeviceId,
      objectClass
    }
  }
}
