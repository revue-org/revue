import { Consumer, EachMessagePayload, Kafka, KafkaMessage } from 'kafkajs'
import { getLogLevel, KafkaOptions } from './KafkaOptions.js'

export default class KafkaConsumer {
  private readonly kafkaConsumer: Consumer
  private readonly kafkaOptions: KafkaOptions

  constructor(config: KafkaOptions) {
    this.kafkaOptions = config
    this.kafkaConsumer = this.createConsumer()
  }

  public async startConsuming(
    topics: string[],
    fromBeginning: boolean,
    consumeHandler: (_message: KafkaMessage) => void
  ): Promise<void> {
    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe({
        topics: topics,
        fromBeginning: fromBeginning
      })

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload
          const prefix: string = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
          console.log(`- ${prefix} ${message.key}#${message.value}`)
          consumeHandler(message)
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public addTopics(topics: string[]): void {
    this.kafkaConsumer.subscribe({ topics: topics })
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createConsumer(): Consumer {
    const kafka: Kafka = new Kafka({
      clientId: this.kafkaOptions.clientId,
      brokers: this.kafkaOptions.brokers.map(broker => `${broker.host}:${broker.port}`),
      logLevel: getLogLevel(),
    })
    return kafka.consumer({ groupId: this.kafkaOptions.groupId! })
  }
}
