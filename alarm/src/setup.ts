import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { AlarmService } from '@/application/services/AlarmService'
import { EventsService } from '@/application/services/EventsService'
import { AlarmServiceImpl } from '@/application/services/impl/AlarmServiceImpl.js'
import { KafkaEventsService } from '@/infrastructure/events/KafkaEventsService.js'
import { MongoDBSecurityRuleRepository } from '@/infrastructure/storage/MongoDBSecurityRuleRepository.js'

let kafkaHost: string = process.env.KAFKA_HOST!
let kafkaPort: string = process.env.KAFKA_PORT!

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: KAFKA DEVELOPMENT MODE')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST!
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT!
}
const kafkaOptions: KafkaOptions = {
  clientId: 'alarm',
  brokers: [{ host: kafkaHost, port: kafkaPort }],
  groupId: 'alarmConsumer'
}

export const alarmService: AlarmService = new AlarmServiceImpl(new MongoDBSecurityRuleRepository())
export const eventsService: EventsService = new KafkaEventsService(kafkaOptions)
