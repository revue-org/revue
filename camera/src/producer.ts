import { Kafka, Partitioners, Producer } from 'kafkajs'
import path from 'path'
import * as fs from 'fs'

import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { ResolutionFactoryImpl } from '@domain/device/factories/impl/ResolutionFactoryImpl.js'
import { Camera } from '@domain/device/core/Camera.js'

if (process.env.CAMERA_CODE === undefined && process.env.NODE_ENV !== 'develop') {
  console.log('No camera code provided')
  process.exit(1)
}
const CAMERA_CODE: string = process.env.CAMERA_CODE || 'cam-01'

const kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
const kafkaPort: string = process.env.KAFKA_PORT || '9092'

const kafka: Kafka = new Kafka({
  clientId: `CAMERA_${CAMERA_CODE}`,
  brokers: [`${kafkaContainer}:${kafkaPort}`]
})

const sourceDevice: Camera = new DeviceFactoryImpl().createCamera(
  new DeviceIdFactoryImpl().createCameraId(CAMERA_CODE),
  '192.168.1.90',
  new ResolutionFactoryImpl().createResolution(1920, 1080)
)

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
      console.log(`CAMERA_${sourceDevice.deviceId.code}`)
      await producer.send({
        topic: `CAMERA_${sourceDevice.deviceId.code}`,
        messages: [
          {
            value: frames[index],
            key: String(key)
          }
        ]
      })
      index++
      key++
    }, 34)
  })
}
