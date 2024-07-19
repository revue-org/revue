import { DeviceEventsHub } from '@/application/services/DeviceEventsHub'
import { DeviceAdded } from '@common/domain/core/DeviceAdded'
import { DeviceRemoved } from '@common/domain/core/DeviceRemoved'
import { KafkaOptions } from '@infrastructure/events/KafkaOptions'
import KafkaProducer from '@infrastructure/events/KafkaProducer.js'
import { DevicePresenter } from '@presentation/DevicePresenter.js'
import { DeviceMessage } from '@common/presentation/schemas/DeviceSchema'

export class KafkaDeviceEventsHub implements DeviceEventsHub {
  private deviceProducer: KafkaProducer

  constructor(kafkaOptions: KafkaOptions) {
    this.deviceProducer = new KafkaProducer(kafkaOptions)
  }

  publishDeviceAdded(addition: DeviceAdded): void {
    const additionMessage: DeviceMessage = DevicePresenter.asMessage(addition)
    this.deviceProducer.produce('devices', additionMessage)
  }

  publishDeviceRemoved(removal: DeviceRemoved): void {
    const removalMessage: DeviceMessage = DevicePresenter.asMessage(removal)
    this.deviceProducer.produce('devices', removalMessage)
  }
}
