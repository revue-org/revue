import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementServiceImpl } from '@/application/services/MeasurementServiceImpl'
import { MongoDBMeasurementRepository } from '@/infrastructure/storage/MongoDBMeasurementRepository'
import { Measurement } from 'common/dist/domain/core/Measurement'
import { MeasureType } from 'common/dist/domain/core/MeasureType'

const service: MeasurementService = new MeasurementServiceImpl(new MongoDBMeasurementRepository())

export const measurementController = {
  getMeasurements: async (): Promise<Measurement[]> => {
    return await service.getMeasurements()
  },
  createMeasurement: async (
    timestamp: Date,
    sourceDeviceId: string,
    measureType: MeasureType,
    value: number
  ): Promise<void> => {
    return service.createNumericMeasurement(timestamp, sourceDeviceId, measureType, value)
  }
}
