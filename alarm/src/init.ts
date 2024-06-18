import { model, Model } from 'mongoose'
import { Intrusion } from '@common/domain/core/Intrusion'
import { Outlier } from '@common/domain/core/Outlier'
import { AlarmService } from './application/services/AlarmService'
import { AlarmServiceImpl } from './application/services/impl/AlarmServiceImpl'
import { securityRuleSchema } from '@/infrastructure/storage/schemas/SecurityRuleSchema'
import { EventsService } from '@/application/services/EventsService'
import { KafkaEventsService } from '@/infrastructure/events/KafkaEventsService'
import { KafkaOptions } from 'common/dist/infrastructure/events/KafkaOptions'
import { SecurityRuleRepository } from '@/application/repositories/SecurityRuleRepository'
import { MongoDBSecurityRuleRepository } from '@/infrastructure/storage/MongoDBSecurityRuleRepository'

let kafkaHost: string = process.env.KAFKA_HOST!
let kafkaPort: string = process.env.KAFKA_PORT!

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: KAFKA DEVELOPMENT MODE')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST!
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT!
}
const kafkaOptions: KafkaOptions = {
  clientId: 'alarmConsumer',
  brokers: [{ host: kafkaHost, port: kafkaPort }],
  groupId: 'alarmConsumer'
}

export const outlierModel: Model<Outlier> = model<Outlier>('Outlier', outlierSchema, 'anomaly')
export const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

export const securityRuleModel: Model<SecurityRule> = model<SecurityRule>(
  'SecurityRule',
  securityRuleSchema,
  'securityRule'
)

const securityRuleRepository: SecurityRuleRepository = new MongoDBSecurityRuleRepository(
  outlierRuleModel,
  intrusionRuleModel
)

export const alarmService: AlarmService = new AlarmServiceImpl(securityRuleRepository)
export const eventsService: EventsService = new KafkaEventsService(kafkaOptions)
