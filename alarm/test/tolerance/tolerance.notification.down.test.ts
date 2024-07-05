import { describe, expect, test } from 'vitest'
import RequestHelper, {
  logHost,
  logPort,
  notificationHost,
  notificationPort
} from '@common/utils/RequestHelper.js'

describe(`When notification service is down`, (): void => {
  test('anomalies should continue to be detected but no notification will be sent', async (): Promise<void> => {
    const actualOutliers: number = (
      await RequestHelper.get(`http://${logHost}:${logPort}/anomalies/outliers`)
    ).data.length

    await new Promise(resolve => setTimeout(resolve, 10000))

    const newOutliers: number = (await RequestHelper.get(`http://${logHost}:${logPort}/anomalies/outliers`))
      .data.length
    expect(newOutliers, 'New outliers has been generated in the meanwhile').toBeGreaterThan(actualOutliers)
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
