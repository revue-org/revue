import { Consumer, EachMessagePayload, Kafka, KafkaMessage, logLevel } from 'kafkajs'
import { KafkaOptions } from './KafkaOptions.js'

export default class KafkaConsumer {
  private kafkaConsumer: Consumer
  private readonly kafkaOptions: KafkaOptions
  private topics: string[] = []
  private config: any

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
      this.topics = topics
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe({
        topics: topics,
        fromBeginning: fromBeginning
      })
      console.log('Consumer subscribed to topics: ', topics)
      this.config = {
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload
          const prefix: string = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
          console.log(`- ${prefix} ${message.key}#${message.value}`)
          consumeHandler(message)
        }
      }
      await this.kafkaConsumer.run(this.config)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async addTopics(newTopics: string[]): Promise<void> {
    console.log('Adding topics: ', newTopics, ' to topics: ', this.topics)
    await this.kafkaConsumer.disconnect()
    this.kafkaConsumer = this.createConsumer()
    this.topics = this.topics.concat(newTopics)
    this.kafkaConsumer.subscribe({ topics: this.topics }).then(() => {
      this.kafkaConsumer.connect().then(() => {
        this.kafkaConsumer.run(this.config).then(() => {
          console.log('Topics added, current topics: ', this.topics)
        })
      })
    })
  }

  public async removeTopics(topicsToRemove: string[]): Promise<void> {
    console.log('Removing topics: ', topicsToRemove, ' from topics: ', this.topics)
    await this.kafkaConsumer.disconnect()
    this.kafkaConsumer = this.createConsumer()
    this.topics = this.topics.filter((topic: string) => !topicsToRemove.includes(topic))
    this.kafkaConsumer.subscribe({ topics: this.topics }).then(() => {
      this.kafkaConsumer.connect().then(() => {
        this.kafkaConsumer.run(this.config).then(() => {
          console.log('Topics removed, current topics: ', this.topics)
        })
      })
    })
  }

  private createConsumer(): Consumer {
    const kafka: Kafka = new Kafka({
      clientId: this.kafkaOptions.clientId,
      brokers: this.kafkaOptions.brokers.map(broker => `${broker.host}:${broker.port}`),
      logLevel: logLevel.INFO //getLogLevel() TODO: remove comment
    })
    return kafka.consumer({ groupId: this.kafkaOptions.groupId! })
  }
}
