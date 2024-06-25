import { Measurement } from 'common/dist/domain/core/Measurement'
import { measurementService } from '@/setup.js'

export const measurementController = {
  getMeasurements: async (limit: number = 200): Promise<Measurement[]> => {
    return await measurementService.getMeasurements(limit)
  },
  getMeasurementsBySourceDeviceId: async (deviceId: string, limit: number = 200): Promise<Measurement[]> => {
    return await measurementService.getMeasurementsBySourceDeviceId(deviceId, limit)
  }
}
