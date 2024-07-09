import { KafkaBroker, KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { getBrokersFromEnv } from '@common/infrastructure/events/KafkaOptions.js'
import { AlarmService } from '@/application/services/AlarmService'
import { AlarmServiceImpl } from '@/application/services/impl/AlarmServiceImpl.js'
import { KafkaAlarmEventsHub } from '@/infrastructure/events/KafkaAlarmEventsHub.js'
import { MongoDBSecurityRuleRepository } from '@/infrastructure/storage/MongoDBSecurityRuleRepository.js'

const brokers: KafkaBroker[] = getBrokersFromEnv()

const kafkaOptions: KafkaOptions = {
  clientId: 'alarm',
  brokers: brokers,
  groupId: 'alarmConsumer'
}

let eventsHub

if (process.env.NODE_ENV !== 'test') {
  eventsHub = new KafkaAlarmEventsHub(kafkaOptions)
}

export const alarmService: AlarmService = new AlarmServiceImpl(
  new MongoDBSecurityRuleRepository(),
  eventsHub as KafkaAlarmEventsHub
)
