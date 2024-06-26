import { KafkaBroker, KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { getBrokersFromEnv } from '@common/infrastructure/events/KafkaOptions.js'
import { DeviceService } from '@/application/services/DeviceService'
import { DeviceServiceImpl } from '@/application/services/impl/DeviceServiceImpl.js'
import { KafkaDeviceEventsHub } from '@/infrastructure/events/KafkaDeviceEventsHub.js'
import { MongoDBDeviceRepository } from '@/infrastructure/storage/MongoDBDeviceRepository.js'

const brokers: KafkaBroker[] = getBrokersFromEnv()

const kafkaOptions: KafkaOptions = {
  clientId: 'device',
  brokers: brokers,
  groupId: 'deviceConsumer'
}

export const deviceService: DeviceService = new DeviceServiceImpl(new MongoDBDeviceRepository(), new KafkaDeviceEventsHub(kafkaOptions))
