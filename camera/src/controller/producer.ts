// import { Kafka, Producer } from 'kafkajs'
//
// const kafka: Kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['localhost:9092']
// })
//
// const producer: Producer = kafka.producer()
// await producer.connect()
// await producer.send({
//   topic: 'test-topic',
//   messages: [
//     { value: 'Hello KafkaJS user!' }
//   ]
// }).catch((err) => console.error(err))
