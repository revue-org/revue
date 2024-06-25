import { DeviceEventsHub } from '@/application/services/DeviceEventsHub'
import { DeviceAdded } from 'common/dist/domain/core/DeviceAdded'
import { DeviceRemoved } from 'common/dist/domain/core/DeviceRemoved'
import { KafkaOptions } from '@infrastructure/events/KafkaOptions'
import KafkaProducer from '@infrastructure/events/KafkaProducer.js'
import { DeviceMessage } from '@presentation/events/schemas/DeviceSchema'
import { DevicesAdapter } from '@presentation/events/adapters/DeviceAdapter.js'

export class KafkaDeviceEventsHub implements DeviceEventsHub {
  private deviceProducer: KafkaProducer

  constructor(kafkaOptions: KafkaOptions) {
    this.deviceProducer = new KafkaProducer(kafkaOptions)
    this.deviceProducer.start().then(_r => console.log('Kafka producer started'))
  }

  publishDeviceAdded(addition: DeviceAdded): void {
    console.log(addition)
    const additionMessage: DeviceMessage = DevicesAdapter.asMessage(addition)
    this.deviceProducer.produce('devices', additionMessage)
  }

  publishDeviceRemoved(removal: DeviceRemoved): void {
    console.log(removal)
    const removalMessage: DeviceMessage = DevicesAdapter.asMessage(removal)
    this.deviceProducer.produce('devices', removalMessage)
  }
}
