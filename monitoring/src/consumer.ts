import { Socket } from 'socket.io'
import { Consumer, Kafka } from 'kafkajs'
import { io } from './index.js'

const kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
const kafkaPort: string = process.env.KAFKA_PORT || '9092'

const consumers: { id: string; consumer: Consumer }[] = []

const getConsumerById = (id: string): Consumer | undefined => {
  return consumers.find((c): boolean => c.id === id)?.consumer
}

export const setupConsumers = async (): Promise<void> => {
  console.log('Setting up consumers')

  const kafka: Kafka = new Kafka({
    clientId: 'monitoring',
    brokers: [`${kafkaContainer}:${kafkaPort}`]
  })

  io.on('connection', async (socket: Socket): Promise<void> => {
    console.log('A client connected', socket.id)

    socket.on('disconnect', () => {
      const consumer = getConsumerById(socket.id)
      if (consumer === undefined) return
      consumer.disconnect()
      consumers.splice(
        consumers.findIndex((c): boolean => c.id === socket.id),
        1
      )
      console.log('A client disconnected', socket.id)
      console.log('Consumers', consumers)
    })

    socket.on('pause', async (topics: string[]): Promise<void> => {
      console.log('Pausing topics', topics)
      const consumer = getConsumerById(socket.id)
      if (consumer === undefined) return
      consumer.pause(topics.map((topic: string): { topic: string } => ({ topic })))
    })

    socket.on('resume', async (topics: string[]): Promise<void> => {
      console.log('Resuming topics', topics)
      const consumer = getConsumerById(socket.id)
      if (consumer === undefined) return
      consumer.resume(topics.map((topic: string): { topic: string } => ({ topic })))
    })

    socket.on('subscribe', async (topics: string[]): Promise<void> => {
      console.log('Subscribing to topics', topics)
      console.log('Consumers:', consumers)
      let consumer = getConsumerById(socket.id)
      if (consumer === undefined) {
        console.log('Creating new consumer')
        consumer = kafka.consumer({ groupId: socket.id })
        console.log('New consumer created')
      }
      await consumer.connect()
      await consumer.subscribe({ topics: topics, fromBeginning: false })
      consumers.push({ id: socket.id, consumer })
      consumer
        .run({
          eachMessage: async ({ topic, message }): Promise<void> => {
            if (message.key === null || message.value === null) return
            const messageKey: Buffer = message.key
            const messageValue: Buffer = message.value
            console.log({
              value: messageValue,
              key: JSON.parse(messageKey.toString())
            })
            console.log(messageValue)
            if (topic.startsWith('CAMERA')) {
              socket.emit('stream', { topic: topic, frame: messageValue.toString() })
            } else if (topic.startsWith('SENSOR')) {
              socket.emit('env-data', { topic: topic, data: messageValue.toString() })
            }
          }
        })
        .then(() => console.log('Consumer running'))
    })
  })
}
