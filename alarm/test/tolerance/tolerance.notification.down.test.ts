import { beforeAll, describe, expect, test } from 'vitest'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import RequestHelper, {
  monitoringHost,
  monitoringPort,
  notificationHost,
  notificationPort
} from '../../src/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import mongoose from 'mongoose'
import { exceedingModel, intrusionModel } from '../../src/init'
import { AnomalyRepository } from 'domain/dist/domain/alarm-system/repositories'
import { AnomalyRepositoryImpl } from 'domain/dist/storage/alarm-system/AnomalyRepositoryImpl'
import { AnomalyService } from 'domain/dist/application/alarm-system/AnomalyService'
import { AnomalyServiceImpl } from 'domain/dist/application/alarm-system/impl/AnomalyServiceImpl'
import { mongoConnect } from 'domain/dist/utils/connection'

describe(`When notification service is down`, (): void => {
  let anomalyService: AnomalyService

  beforeAll(async (): Promise<void> => {
    const username: string = process.env.ALARM_DB_USERNAME || 'admin'
    const password: string = process.env.ALARM_DB_PASSWORD || 'admin'
    const host: string =
      process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.ALARM_DB_HOST || 'localhost'
    const dbPort: string =
      process.env.NODE_ENV === 'develop'
        ? process.env.ALARM_DB_PORT || '27017'
        : process.env.DEFAULT_DB_PORT || '27017'
    const dbName: string = process.env.ALARM_DB_NAME || 'alarm'

    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    const anomalyRepository: AnomalyRepository = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)
    anomalyService = new AnomalyServiceImpl(anomalyRepository)
  })

  test('anomalies should continue to be detected but no notification will be sent', async (): Promise<void> => {
    const response: AxiosResponse = await RequestHelper.get(
      `http://${monitoringHost}:${monitoringPort}/devices/sensors`
    )
    expect(response.status).toBe(HttpStatusCode.OK)
    const sensors = response.data
    const intervals: number[] = sensors.map((sensor: any): number => sensor.intervalMillis)

    const actualAnomalies: number = (await anomalyService.getExceedings()).length
    await new Promise(
      (resolve): NodeJS.Timeout =>
        setTimeout(resolve, intervals.reduce((acc: number, curr: number) => acc + curr, 0) + 2)
    )

    const newAnomalies: number = (await anomalyService.getExceedings()).length
    expect(newAnomalies, 'New anomalies has been generated in the meanwhile').toBeGreaterThan(actualAnomalies)
    let notificationResponse: AxiosResponse | undefined
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
