import { Kafka, Partitioners, Producer } from 'kafkajs'
import path from 'path'
import * as fs from 'fs'
import { config } from 'dotenv'
import { CAMERA_CODE } from './index.js'

config()

const kafka: Kafka = new Kafka({
  clientId: 'camera', // TODO: Change this to Device ID
  brokers: ['revue-kafka:9092']
})

export const produce = async (): Promise<void> => {
  // const videoPath: string = path.resolve('video.mp4')
  const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  await producer.connect()
  console.log('Leggo images')
  const frames: string[] = []
  fs.readdir(path.resolve('images'), (_err, files) => {
    let index: number = 0
    let key: number = 0
    files.sort((a, b) => {
      const numA = parseInt(a.split('frame')[1])
      const numB = parseInt(b.split('frame')[1])
      return numA - numB
    })
    console.log(files)
    for (let i: number = 0; i < files.length; i++) {
      frames.push(fs.readFileSync(path.resolve('images', files[i]), { encoding: 'base64' }))
    }
    setInterval(async (): Promise<void> => {
      if (index == files.length - 1) index = 0
      console.log('Sending image ' + index)
      console.log(`CAMERA_${CAMERA_CODE}`)
      await producer.send({
        topic: `CAMERA_${CAMERA_CODE}`,
        messages: [
          {
            value: frames[index],
            key: String(key)
          }
        ]
      })
      // await producer.send({
      //   topic: 'cam-02', messages: [{
      //     value: data,
      //     key: String(key)
      //   }]
      // })
      // })
      index++
      key++
    }, 34)
  })
}
