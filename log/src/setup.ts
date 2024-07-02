import { KafkaBroker, KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { getBrokersFromEnv } from '@common/infrastructure/events/KafkaOptions.js'
import { KafkaLogEventsHub } from '@/infrastructure/events/KafkaLogEventsHub.js'
import { AnomalyService } from '@/application/services/AnomalyService'
import { AnomalyServiceImpl } from '@/application/services/AnomalyServiceImpl.js'
import { MongoDBAnomalyRepository } from '@/infrastructure/storage/MongoDBAnomalyRepository.js'
import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementServiceImpl } from '@/application/services/MeasurementServiceImpl.js'
import { MongoDBMeasurementRepository } from '@/infrastructure/storage/MongoDBMeasurementRepository.js'
import { LogEventsHub } from '@/application/services/LogEventsHub'

const brokers: KafkaBroker[] = getBrokersFromEnv()

const kafkaOptions: KafkaOptions = {
  clientId: 'log',
  brokers: brokers,
  groupId: 'logConsumer'
}

const logEventsHub: LogEventsHub = new KafkaLogEventsHub(kafkaOptions)
export const anomalyService: AnomalyService = new AnomalyServiceImpl(
  new MongoDBAnomalyRepository(),
  logEventsHub
)
export const measurementService: MeasurementService = new MeasurementServiceImpl(
  new MongoDBMeasurementRepository(),
  logEventsHub
)
