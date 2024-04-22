import { beforeAll, describe, expect, it } from 'vitest'
import kafkaManager from '../../src/utils/KafkaManager.js'
import { Consumer } from 'kafkajs'
import { DeviceService } from 'domain/dist/application/device/DeviceService'
import { mongoConnect } from 'domain/dist/utils/connection'
import mongoose from 'mongoose'
import { DeviceRepository } from 'domain/dist/domain/device/repositories/DeviceRepository'
import { DeviceRepositoryImpl } from 'domain/dist/storage/device/DeviceRepositoryImpl'
import { cameraModel, sensorModel } from '../../src/init.js'
import { DeviceServiceImpl } from 'domain/dist/application/device/impl/DeviceServiceImpl'
import { DeviceIdFactory, DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories'
import { Device, Sensor } from 'domain/dist/domain/device/core'

const sensorCode: string = 'sen-01'

describe(`When sensor ${sensorCode} is down`, (): void => {
  let deviceService: DeviceService

  beforeAll(async (): Promise<void> => {
    const username: string = process.env.MONITORING_DB_USERNAME || 'admin'
    const password: string = process.env.MONITORING_DB_PASSWORD || 'admin'
    const host: string =
      process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.MONITORING_DB_HOST || 'localhost'
    const dbPort: string =
      process.env.NODE_ENV === 'develop'
        ? process.env.MONITORING_DB_PORT || '27017'
        : process.env.DEFAULT_DB_PORT || '27017'
    const dbName: string = process.env.MONITORING_DB_NAME || 'monitoring'

    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    const deviceRepository: DeviceRepository = new DeviceRepositoryImpl(cameraModel, sensorModel)
    deviceService = new DeviceServiceImpl(deviceRepository)
  })

  it('should consuming no environment data from kafka', async (): Promise<void> => {
    const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
    const sensor: Device = await deviceService.getDeviceById(deviceIdFactory.createSensorId('sen-01'))
    const interval: number = (sensor as Sensor).intervalMillis
    const collectedData: string[] = []
    const consumer: Consumer = kafkaManager.createConsumer('test-consumer-sensor')
    await consumer.connect()
    await consumer.subscribe({ topics: [`SENSOR_${sensorCode}`], fromBeginning: false })
    await consumer.run({
      eachMessage: async ({ topic, message }): Promise<void> => {
        if (message.value === null) return
        collectedData.push(message.value.toString())
      }
    })
    await new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, interval + 2000))
    expect(collectedData.length).toBe(0)
  })
})
