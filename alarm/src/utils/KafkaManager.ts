import { Consumer, Kafka } from 'kafkajs'

export class KafkaManager {
  private kafka: Kafka

  constructor(kafkaHost: string, kafkaPort: string) {
    console.log('INFO: SETUP KAFKA')
    this.kafka = new Kafka({
      clientId: 'alarm',
      brokers: [`${kafkaHost}:${kafkaPort}`]
    })
  }

  createConsumer(groupId: string): Consumer {
    return this.kafka.consumer({ groupId: groupId })
  }
}
