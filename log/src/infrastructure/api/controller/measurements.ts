import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementServiceImpl } from '@/application/services/MeasurementServiceImpl'
import { MongoDBMeasurementRepository } from '@/infrastructure/storage/MongoDBMeasurementRepository'
import { Measurement } from 'common/dist/domain/core/Measurement'

const service: MeasurementService = new MeasurementServiceImpl(new MongoDBMeasurementRepository())

export const measurementController = {
  getMeasurements: async (limit: number = 200): Promise<Measurement[]> => {
    return await service.getMeasurements(limit)
  },
  getMeasurementsBySourceDeviceId: async (deviceId: string, limit: number = 200): Promise<Measurement[]> => {
    return await service.getMeasurementsBySourceDeviceId(deviceId, limit)
  }
}
