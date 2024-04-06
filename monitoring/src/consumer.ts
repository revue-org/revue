import { Socket } from 'socket.io'
import { Consumer } from 'kafkajs'
import { io } from './index.js'
import kafkaManager from './utils/KafkaManager.js'

const consumers: { id: string; consumer: Consumer }[] = []

const getConsumerById = (id: string): Consumer | undefined => {
  return consumers.find((c): boolean => c.id === id)?.consumer
}

export const setupConsumers = async (): Promise<void> => {
  console.log('Setting up consumers')

  io.on('connection', async (socket: Socket): Promise<void> => {
    console.log('A client connected', socket.id)

    socket.on('disconnect', () => {
      const consumer: Consumer | undefined = getConsumerById(socket.id)
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
      const consumer: Consumer | undefined = getConsumerById(socket.id)
      if (consumer === undefined) return
      consumer.pause(topics.map((topic: string): { topic: string } => ({ topic })))
    })

    socket.on('resume', async (topics: string[]): Promise<void> => {
      console.log('Resuming topics', topics)
      const consumer: Consumer | undefined = getConsumerById(socket.id)
      if (consumer === undefined) return
      try {
        consumer.resume(topics.map((topic: string): { topic: string } => ({ topic })))
        console.log('Consumer resuming')
      } catch (err) {
        consumer
          .run({
            eachMessage: async ({ topic, message }): Promise<void> => {
              if (message.value === null) return
              const messageValue: Buffer = message.value
              console.log('Arrived message ', messageValue.toString())
              console.log(messageValue)
              if (topic.startsWith('CAMERA')) {
                socket.emit('stream', { topic: topic, frame: messageValue.toString() })
              } else if (topic.startsWith('SENSOR')) {
                socket.emit('env-data', { topic: topic, data: messageValue.toString() })
              }
            }
          })
          .then(() => console.log('Consumer running'))
        console.log('Consumer start running')
      }
    })

    socket.on('subscribe', async (topics: string[]): Promise<void> => {
      console.log('Subscribing to topics', topics)
      console.log('Consumers:', consumers)
      let consumer: Consumer | undefined = getConsumerById(socket.id)
      if (consumer === undefined) {
        consumer = kafkaManager.createConsumer(socket.id)
        console.log('New consumer created')
      }
      await consumer.connect()
      await consumer.subscribe({ topics: topics, fromBeginning: false })

      consumers.push({ id: socket.id, consumer })
      console.log('Consumers', consumers)
      socket.emit('subscribed')
    })
  })
}
