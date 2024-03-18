import { Consumer, Kafka } from 'kafkajs'

class KafkaManager {
  private kafka: Kafka

  constructor(kafkaHost: string, kafkaPort: string) {
    this.kafka = new Kafka({
      clientId: 'alarm',
      brokers: [`${kafkaHost}:${kafkaPort}`]
    })
  }

  createConsumer(groupId: string): Consumer {
    return this.kafka.consumer({ groupId: groupId })
  }
}

let kafkaHost: string = process.env.KAFKA_HOST || 'revue-kafka'
let kafkaPort: string = process.env.KAFKA_PORT || '9092'

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: KAFKA DEVELOPMENT MODE')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST || 'localhost'
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT || '9094'
}

const kafkaManager: KafkaManager = new KafkaManager(kafkaHost, kafkaPort)
export default kafkaManager
