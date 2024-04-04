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

let kafkaHost: string = process.env.KAFKA_HOST!
let kafkaPort: string = process.env.KAFKA_PORT!

console.log(`INFO: KAFKA HOST: ${kafkaHost}`)
console.log(`INFO: KAFKA PORT: ${kafkaPort}`)

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: KAFKA DEVELOPMENT MODE')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST!
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT!
}


const kafkaManager: KafkaManager = new KafkaManager(kafkaHost, kafkaPort)
export default kafkaManager
