import { DomainEventId } from '../core/DomainEventId'
import { DeviceAdded } from '../core/DeviceAdded'
import { DeviceRemoved } from '../core/DeviceRemoved'
import { v4 as uuidv4 } from 'uuid'

export class DeviceEventFactory {
  static newId(): DomainEventId {
    return { value: uuidv4() }
  }

  static idOf(value: string): DomainEventId {
    return { value }
  }

  static createAddition(timestamp: Date, additionDeviceId: string): DeviceAdded {
    return this.additionFrom(this.newId(), timestamp, additionDeviceId)
  }

  static additionFrom(id: DomainEventId, timestamp: Date, additionDeviceId: string): DeviceAdded {
    return {
      id,
      type: 'addition',
      timestamp,
      sourceDeviceId: additionDeviceId
    }
  }

  static createRemoval(timestamp: Date, removalDeviceId: string): DeviceRemoved {
    return this.removalFrom(this.newId(), timestamp, removalDeviceId)
  }

  static removalFrom(id: DomainEventId, timestamp: Date, removalDeviceId: string): DeviceRemoved {
    return {
      id,
      type: 'removal',
      timestamp,
      sourceDeviceId: removalDeviceId
    }
  }
}
