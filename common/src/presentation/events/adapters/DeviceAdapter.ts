import { DeviceEvent } from '../../../domain/core'
import { DeviceMessage, deviceSchema } from '../schemas/DeviceSchema'
import { DeviceEventFactory } from '../../../domain/factories/DeviceEventFactory'

export class DevicesAdapter {
  static asDomainEvent(deviceObj: object): DeviceEvent {
    const deviceMessage: DeviceMessage = deviceSchema.parse(deviceObj)
    if (deviceMessage.type === 'addition') {
      return DeviceEventFactory.createAddition(deviceMessage.timestamp, deviceMessage.data.additionDeviceId!)
    } else if (deviceMessage.type === 'removal') {
      return DeviceEventFactory.createRemoval(deviceMessage.timestamp, deviceMessage.data.removalDeviceId!)
    } else {
      throw new Error('Device event type not supported')
    }
  }

  static asMessage(deviceEvent: DeviceEvent): DeviceMessage {
    if (deviceEvent.type === 'addition') {
      return {
        id: deviceEvent.id.value,
        type: 'addition',
        timestamp: deviceEvent.timestamp,
        data: {
          additionDeviceId: deviceEvent.sourceDeviceId
        }
      }
    } else if (deviceEvent.type === 'removal') {
      return {
        id: deviceEvent.id.value,
        type: 'removal',
        timestamp: deviceEvent.timestamp,
        data: {
          removalDeviceId: deviceEvent.sourceDeviceId
        }
      }
    } else {
      throw new Error('Device event type not supported')
    }
  }
}
