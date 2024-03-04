import { AnomalyFactoryImpl } from '@domain/alarm-system/factories/impl/AnomalyFactoryImpl.js'
import { Exceeding } from '@domain/alarm-system/core/Exceeding.js'
import { Intrusion } from '@domain/alarm-system/core/Intrusion.js'
import { AnomalyFactory } from '@domain/alarm-system/factories/AnomalyFactory.js'
import { AnomalyTypeConverter } from '@utils/AnomalyTypeConverter.js'
import { Anomaly } from '@domain/alarm-system/core/Anomaly.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { ObjectClass } from '@domain/alarm-system/core/impl/enum/ObjectClass.js'
import alarmService from '../init.js'

const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()

export const anomalyController = {
  getAnomalyById: async (id: string): Promise<Anomaly> => {
    return alarmService.getAnomalyById(id)
  },
  getExceedings: async (): Promise<Exceeding[]> => {
    return alarmService.getExceedings()
  },
  getIntrusions: async (): Promise<Intrusion[]> => {
    return alarmService.getIntrusions()
  },
  createExceeding: async (deviceId: DeviceId, measure: Measure, value: number): Promise<string> => {
    return alarmService.insertExceeding(
      anomalyFactory.createExceeding(deviceId, new Date(), measure, value, '')
    )
  },
  createIntrusion: async (deviceId: DeviceId, intrusionObject: ObjectClass): Promise<string> => {
    return alarmService.insertIntrusion(
      anomalyFactory.createIntrusion(deviceId, new Date(), intrusionObject, '')
    )
  },
  updateExceeding(
    id: string,
    deviceId: DeviceId,
    timestamp: Date,
    measure: Measure,
    value: number
  ): void {
    return alarmService.updateExceeding(
      anomalyFactory.createExceeding(deviceId, timestamp, measure, value, id)
    )
  },
  updateIntrusion(
    id: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): void {
    return alarmService.updateIntrusion(
      anomalyFactory.createIntrusion(deviceId, timestamp, intrusionObject, id)
    )
  },
  deleteAnomaly: async (id: string, type: string): Promise<void> => {
    alarmService.deleteAnomaly(id, AnomalyTypeConverter.convertToAnomalyType(type))
  }
}
