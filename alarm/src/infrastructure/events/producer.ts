import KafkaProducer from 'common/dist/infrastructure/events/KafkaProducer.js'
import { KafkaOptions } from 'common/dist/infrastructure/events/KafkaOptions'

let kafkaHost: string = process.env.KAFKA_HOST!
let kafkaPort: string = process.env.KAFKA_PORT!

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: KAFKA DEVELOPMENT MODE')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST!
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT!
}
const kafkaOptions: KafkaOptions = {
  clientId: 'alarmProducer',
  brokers: [{ host: kafkaHost, port: kafkaPort }]
}

const producer: KafkaProducer = new KafkaProducer(kafkaOptions)

export const produce = (topic: string, obj: any): void => {
  producer.produce(topic, obj)
}
