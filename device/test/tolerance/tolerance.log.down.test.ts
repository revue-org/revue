import { beforeAll, describe, expect, test } from 'vitest'
import RequestHelper, { logHost, logPort } from '../utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import { Consumer } from 'kafkajs'
import mongoose from 'mongoose'
import { mongoConnect } from 'common/dist/utils/connection.js'
import { MongoDBDeviceRepository } from '@/infrastructure/storage/MongoDBDeviceRepository.js'
import { DeviceServiceImpl } from '@/application/services/DeviceServiceImpl.js'
import { DeviceService } from '@/application/services/DeviceService.js'
import { Device } from '@/domain/core/Device.js'

describe(`When log service is down`, (): void => {
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
    deviceService = new DeviceServiceImpl(new MongoDBDeviceRepository())
  })

  test('sensor should continue producing data but not storing them', async (): Promise<void> => {
    const sensors: Device[] = await deviceService.getDevices()
    const intervals: number[] = sensors.map((sensor: any): number => sensor.intervalMillis)
    const collectedData: string[] = []
    /*const consumer: Consumer = kafkaManager.createConsumer('test-consumer-log')
    await consumer.connect()
    await consumer.subscribe({
      topics: sensors.map((sensor: any) => `SENSOR_${sensor._id.code}`),
      fromBeginning: false
    })
    await consumer.run({
      eachMessage: async ({ topic, message }): Promise<void> => {
        if (message.value === null) return
        collectedData.push(message.value.toString())
      }
    })
    await new Promise(
      (resolve): NodeJS.Timeout =>
        setTimeout(resolve, intervals.reduce((acc: number, curr: number) => acc + curr, 0) + 2000)
    )
    expect(collectedData.length).not.toBe(0)
    let logResponse: AxiosResponse | undefined
    try {
      logResponse = await RequestHelper.get(`http://${logHost}:${logPort}/environment-data`)
    } catch (e: any) {
      expect(e).toBeDefined()
    }
    expect(logResponse, 'Log service should be down').toBe(undefined)*/
  })
})
