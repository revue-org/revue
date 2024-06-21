import { DomainEventId } from '../core/DomainEventId.js'
import { Detection } from '../core/Detection.js'
import { ObjectClass } from '../core/ObjectClass.js'

export class DetectionFactory {
  static newId(): DomainEventId {
    return {
      value: 'test'
    }
  }

  static idOf(value: string): DomainEventId {
    return { value }
  }

  static createDetection(timestamp: Date, sourceDeviceId: string, objectClass: ObjectClass): Detection {
    return {
      id: this.newId(),
      timestamp,
      type: 'detection',
      sourceDeviceId,
      objectClass
    }
  }
}
