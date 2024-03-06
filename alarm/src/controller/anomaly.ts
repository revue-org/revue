import { AnomalyFactoryImpl } from '@domain/alarm-system/factories/impl/AnomalyFactoryImpl.js'
import { Exceeding } from '@domain/alarm-system/core/Exceeding.js'
import { Intrusion } from '@domain/alarm-system/core/Intrusion.js'
import { AnomalyFactory } from '@domain/alarm-system/factories/AnomalyFactory.js'
import { AnomalyTypeConverter } from '@utils/AnomalyTypeConverter.js'
import { Anomaly } from '@domain/alarm-system/core/Anomaly.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { ObjectClass } from '@domain/alarm-system/core/impl/enum/ObjectClass.js'
import { anomalyService } from '../init.js'

const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()

export const anomalyController = {
  getAnomalyById: async (id: string): Promise<Anomaly> => {
    return anomalyService.getAnomalyById(id)
  },
  getExceedings: async (): Promise<Exceeding[]> => {
    return anomalyService.getExceedings()
  },
  getIntrusions: async (): Promise<Intrusion[]> => {
    return anomalyService.getIntrusions()
  },
  createExceeding: async (deviceId: DeviceId, measure: Measure, value: number): Promise<string> => {
    return anomalyService.insertExceeding(
      anomalyFactory.createExceeding(deviceId, new Date(), measure, value, '')
    )
  },
  createIntrusion: async (deviceId: DeviceId, intrusionObject: ObjectClass): Promise<string> => {
    return anomalyService.insertIntrusion(
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
    return anomalyService.updateExceeding(
      anomalyFactory.createExceeding(deviceId, timestamp, measure, value, id)
    )
  },
  updateIntrusion(
    id: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): void {
    return anomalyService.updateIntrusion(
      anomalyFactory.createIntrusion(deviceId, timestamp, intrusionObject, id)
    )
  },
  deleteAnomaly: async (id: string, type: string): Promise<void> => {
    anomalyService.deleteAnomaly(id, AnomalyTypeConverter.convertToAnomalyType(type))
  }
}
