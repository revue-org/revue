import KafkaConsumer from 'common/dist/infrastructure/events/KafkaConsumer.js'
import { KafkaOptions } from 'common/dist/infrastructure/events/KafkaOptions'

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

const consumer: KafkaConsumer = new KafkaConsumer(kafkaOptions)

consumer.startConsumer(['alarm'], false, (message: any) => {

  console.log('Message received: ', message)
}).then((): void => {
  console.log('Consumer started')
})
