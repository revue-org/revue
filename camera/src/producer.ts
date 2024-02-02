import { Kafka, Partitioners, Producer } from 'kafkajs'
import path from 'path'
import * as fs from 'fs'

import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { ResolutionFactoryImpl } from '@domain/device/factories/impl/ResolutionFactoryImpl.js'
import type { Camera } from '@domain/device/core/Camera.js'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'

if (process.env.CAMERA_CODE === undefined && process.env.NODE_ENV !== 'develop') {
  console.log('No camera code provided')
  process.exit(1)
}
const CAMERA_CODE: string = process.env.CAMERA_CODE || 'cam-01'

let sourceCamera: Camera

export const getCameraInfo = async (): Promise<void> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  try {
    const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/cameras/${CAMERA_CODE}`)
    console.log('Response:', res.data)
    sourceCamera = new DeviceFactoryImpl().createCamera(
      new DeviceIdFactoryImpl().createCameraId(res.data._id.code),
      false,
      res.data.ipAddress,
      new ResolutionFactoryImpl().createResolution(res.data.resolution.width, res.data.resolution.height)
    )
    console.log(sourceCamera)
  } catch (e) {
    throw new Error('Error while getting camera info')
  }
}

const kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
const kafkaPort: string = process.env.KAFKA_PORT || '9092'

const kafka: Kafka = new Kafka({
  clientId: `CAMERA_${CAMERA_CODE}`,
  brokers: [`${kafkaContainer}:${kafkaPort}`]
})

export const produce = async (): Promise<void> => {
  const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  await producer.connect()
  console.log('Leggo images')
  const frames: string[] = []
  fs.readdir(path.resolve('images'), (_err, files) => {
    let index: number = 0
    let key: number = 0
    files.sort((a, b) => {
      const numA: number = parseInt(a.split('frame')[1])
      const numB: number = parseInt(b.split('frame')[1])
      return numA - numB
    })
    console.log(files)
    for (let i: number = 0; i < files.length; i++) {
      frames.push(fs.readFileSync(path.resolve('images', files[i]), { encoding: 'base64' }))
    }
    setInterval(async (): Promise<void> => {
      if (index == files.length - 1) index = 0
      console.log('Sending image ' + index)
      console.log(`CAMERA_${sourceCamera.deviceId.code}`)
      await producer.send({
        topic: `CAMERA_${sourceCamera.deviceId.code}`,
        messages: [
          {
            value: frames[index],
            key: String(key)
          }
        ]
      })
      index++
      key++
    }, 400) //34
  })
}
