import { DeviceId, Measure } from 'domain/dist/domain/device/core'
import { notificationController } from '../controller/notification.js'
import { ObjectClass } from '@domain/security-rule/core/impl/enum/ObjectClass.js'
import { io } from '../index.js'

export const simulationController = {
  simulateExceeding: async (
    anomalyId: string,
    deviceId: DeviceId,
    measure: Measure,
    value: number
  ): Promise<void> => {
    await notificationController.createExceedingNotification(anomalyId, deviceId, measure, value)

    io.emit('exceeding', { newExceeding: true })
  },
  simulateIntrusion: async (
    anomalyId: string,
    deviceId: DeviceId,
    objectClass: ObjectClass
  ): Promise<void> => {
    await notificationController.createIntrusionNotification(anomalyId, deviceId, objectClass)

    io.emit('intrusion', { newIntrusion: true })
  }
}
