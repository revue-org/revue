import { Socket } from 'socket.io'
// @ts-ignore
import ss from 'socket.io-stream'
import { Consumer, Kafka } from 'kafkajs'
import { io } from './index.js'
import * as console from 'console'

const consumers: { id: string; consumer: Consumer }[] = []

const getConsumerById = (id: string): Consumer => {
  return consumers.find((c): boolean => c.id === id)!.consumer
}

export const setupConsumers = async (): Promise<void> => {
  console.log('Setting up consumers')

  const kafka: Kafka = new Kafka({
    clientId: 'monitoring',
    brokers: ['revue-kafka:9092']
  })

  io.on('connection', async (socket: Socket): Promise<void> => {
    console.log('A client connected', socket.id)
    console.log('Consumers', consumers)

    socket.on('disconnect', () => {
      getConsumerById(socket.id).disconnect()
      consumers.splice(
        consumers.findIndex((c): boolean => c.id === socket.id),
        1
      )
      console.log('A client disconnected', socket.id)
      console.log('Consumers', consumers)
    })

    socket.on('pause', async (topics: string[]): Promise<void> => {
      console.log('Pausing topics', topics)
      getConsumerById(socket.id).pause(
        topics.map((topic: string): { topic: string } => ({ topic }))
      )
    })

    socket.on('resume', async (topics: string[]): Promise<void> => {
      console.log('Resuming topics', topics)
      getConsumerById(socket.id).resume(
        topics.map((topic: string): { topic: string } => ({ topic }))
      )
    })

    socket.on('subscribe', async (topics: string[]): Promise<void> => {
      if (!consumers.find((c): boolean => c.id === socket.id)) {
        const consumer: Consumer = kafka.consumer({ groupId: socket.id })
        await consumer.connect()
        await consumer.subscribe({ topics: topics, fromBeginning: false })
        consumers.push({ id: socket.id, consumer })
        consumer
          .run({
            eachMessage: async ({ message }): Promise<void> => {
              if (message.key === null || message.value === null) return
              const messageKey: Buffer = message.key
              const messageValue: Buffer = message.value
              console.log({
                value: messageValue,
                key: JSON.parse(messageKey.toString())
              })
              socket.emit('stream', [messageValue.toString(), messageKey.toString()])
            }
          })
          .then(() => console.log('Consumer running'))
      }
    })

    socket.on('get-stream', async (): Promise<void> => {
      console.log('ciao')
      // const kafkaStream = ss.createStream()

      // await consumer.disconnect()
    })
  })
}
