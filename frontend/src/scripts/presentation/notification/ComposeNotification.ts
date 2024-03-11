import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import { DeviceTypeConverter, MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'
import { DeviceType } from 'domain/dist/domain/device/core'
import type { Exceeding, Intrusion } from 'domain/dist/domain/alarm-system/core'
import type { NotificationFactory } from 'domain/dist/domain/notification/factories/NotificationFactory.js'
import { NotificationFactoryImpl } from 'domain/dist/domain/notification/factories/impl/NotificationFactoryImpl.js'
import type { AnomalyFactory } from 'domain/dist/domain/alarm-system/factories'
import { AnomalyFactoryImpl } from 'domain/dist/domain/alarm-system/factories'
import type { DeviceIdFactory } from 'domain/dist/domain/device/factories'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories'
import type { Notification } from 'domain/dist/domain/notification/core/Notification.js'

const notificationFactory: NotificationFactory = new NotificationFactoryImpl()
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const composeNotification = async (notification: any): Promise<Notification> => {
  const resAnomaly = await RequestHelper.get(
    `http://${alarmHost}:${alarmPort}/anomalies/` + notification.anomalyId
  )
  switch (DeviceTypeConverter.convertToDeviceType(resAnomaly.data.deviceId.type)) {
    case DeviceType.CAMERA:
      return notificationFactory.createIntrusionNotification(
        notification._id,
        composeIntrusion(resAnomaly.data)
      )
    case DeviceType.SENSOR:
      return notificationFactory.createExceedingNotification(
        notification._id,
        composeExceeding(resAnomaly.data)
      )
  }
}

function composeIntrusion(intrusion: any): Intrusion {
  return anomalyFactory.createIntrusion(
    deviceIdFactory.createCameraId(intrusion.deviceId.code),
    new Date(intrusion.timestamp),
    ObjectClassConverter.convertToObjectClass(intrusion.intrusionObject),
    intrusion._id
  )
}

function composeExceeding(exceeding: any): Exceeding {
  return anomalyFactory.createExceeding(
    deviceIdFactory.createSensorId(exceeding.deviceId.code),
    new Date(exceeding.timestamp),
    MeasureConverter.convertToMeasure(exceeding.measure),
    exceeding.value,
    exceeding._id
  )
}
