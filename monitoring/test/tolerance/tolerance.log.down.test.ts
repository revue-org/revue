import { describe, expect, test } from 'vitest'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import RequestHelper, { logHost, logPort, monitoringHost, monitoringPort } from '../utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import kafkaManager from '../../src/utils/KafkaManager.js'
import { Consumer } from 'kafkajs'

describe(`When log service is down`, (): void => {
  test('sensor should continue producing data but not storing them', async (): Promise<void> => {
    const response: AxiosResponse = await RequestHelper.get(
      `http://${monitoringHost}:${monitoringPort}/devices/sensors`
    )
    expect(response.status).toBe(HttpStatusCode.OK)
    const sensors = response.data
    const intervals: number[] = sensors.map((sensor: any): number => sensor.intervalMillis)
    const collectedData: string[] = []
    const consumer: Consumer = kafkaManager.createConsumer('test-consumer-log')
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
      (resolve): NodeJS.Timeout => setTimeout(resolve, intervals.reduce((acc, curr) => acc + curr, 0) + 2)
    )
    expect(collectedData.length).not.toBe(0)
    let logResponse: AxiosResponse | undefined
    try {
      logResponse = await RequestHelper.get(`http://${logHost}:${logPort}/environment-data`)
    } catch (e: any) {
      expect(e).toBeDefined()
    }
    expect(logResponse, 'Log service should be down').toBe(undefined)
  })
})
