import { beforeAll, describe, expect, test } from 'vitest'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { AxiosResponse } from 'axios'
import mongoose from 'mongoose'
import { mongoConnect } from '@common/utils/connection'
import { AlarmService } from '@/application/services/AlarmService'
import { alarmService } from '@/setup.js'
import RequestHelper, {
  deviceHost,
  devicePort,
  logHost,
  logPort,
  notificationHost,
  notificationPort
} from '@common/utils/RequestHelper.js'

describe(`When notification service is down`, (): void => {
  beforeAll(async (): Promise<void> => {
    // const username: string = process.env.ALARM_DB_USERNAME || 'admin'
    // const password: string = process.env.ALARM_DB_PASSWORD || 'admin'
    // const host: string =
    //   process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.ALARM_DB_HOST || 'localhost'
    // const dbPort: string =
    //   process.env.NODE_ENV === 'develop'
    //     ? process.env.ALARM_DB_PORT || '27017'
    //     : process.env.DEFAULT_DB_PORT || '27017'
    // const dbName: string = process.env.ALARM_DB_NAME || 'alarm'
    // await mongoConnect(mongoose, username, password, host, dbPort, dbName)
  })

  test('anomalies should continue to be detected but no notification will be sent', async (): Promise<void> => {
    const response = await RequestHelper.get(`http://${deviceHost}:${devicePort}/devices/sensors`)
    expect(response.status).toBe(HttpStatusCode.OK)
    const sensors = response.data
    const intervals: number[] = sensors.map((sensor: any): number => sensor.intervalMillis)

    const actualAnomalies: number = (await RequestHelper.get(`http://${logHost}:${logPort}/anomalies`)).data
      .length
    await new Promise(resolve =>
      setTimeout(resolve, intervals.reduce((acc: number, curr: number) => acc + curr, 0) + 2000)
    )

    const newAnomalies: number = (await RequestHelper.get(`http://${logHost}:${logPort}/anomalies`)).data
      .length
    expect(newAnomalies, 'New anomalies has been generated in the meanwhile').toBeGreaterThan(actualAnomalies)
    let notificationResponse
    try {
      notificationResponse = await RequestHelper.get(
        `http://${notificationHost}:${notificationPort}/notifications`
      )
    } catch (e: any) {
      expect(e).toBeDefined()
    }
    expect(notificationResponse, 'Notification service should be down').toBe(undefined)
  })
})
