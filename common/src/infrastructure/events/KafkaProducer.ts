import { Kafka, Partitioners, Producer } from 'kafkajs'
import { KafkaOptions } from './KafkaOptions'

export default class ProducerFactory {
  private producer: Producer
  private readonly kafkaOptions: KafkaOptions

  constructor(kafkaOptions: KafkaOptions) {
    this.kafkaOptions = kafkaOptions
    this.producer = this.createProducer()
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  public produce(topic: string, message: object): void {
    try {
      this.producer.send({
        topic: topic,
        messages: [
          { value: JSON.stringify(message) }
        ]
      }).then(() => {
        console.log('Message sent to topic: ', topic)
      })
    } catch (error) {
      console.log('Error producing message: ', error)
    }
  }

  private createProducer(): Producer {
    const kafka: Kafka = new Kafka({
      clientId: this.kafkaOptions.clientId,
      brokers: this.kafkaOptions.brokers.map(broker => `${broker.host}:${broker.port}`)
    })
    return kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  }
}
