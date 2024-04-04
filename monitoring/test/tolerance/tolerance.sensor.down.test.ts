import { describe, expect, it } from 'vitest'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import RequestHelper, { monitoringHost, monitoringPort } from '../utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import kafkaManager from '../../src/utils/KafkaManager.js'
import { Consumer } from 'kafkajs'

const sensorCode: string = 'sen-01'

describe(`When sensor ${sensorCode} is down`, (): void => {

  it('should consuming no environment data from kafka', async (): Promise<void> => {
    const sensor: AxiosResponse = await RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices/sensors/sen-01`)
    expect(sensor.status).toBe(HttpStatusCode.OK)
    const interval: number = sensor.data.intervalMillis
    const collectedData: string[] = []
    const consumer: Consumer = kafkaManager.createConsumer('test-consumer-sensor')
    await consumer.connect()
    await consumer.subscribe({ topics: [`SENSOR_${sensorCode}`], fromBeginning: false })
    await consumer
      .run({
        eachMessage: async ({ topic, message }): Promise<void> => {
          if (message.value === null) return
          collectedData.push(message.value.toString())
        }
      })
    await new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, interval + 2))
    expect(collectedData.length).toBe(0)
  })


})
